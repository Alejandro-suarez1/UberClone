// AI-assisted: see docs/AI_LOG.md #B-24
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const PORT = process.env.PORT || 3000;
const PUBLIC_URL = (process.env.PUBLIC_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
const MP_API = 'https://api.mercadopago.com';

if (!process.env.MP_ACCESS_TOKEN) {
  console.error('Falta MP_ACCESS_TOKEN en el archivo .env');
  process.exit(1);
}

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
} else {
  admin.initializeApp({ credential: admin.credential.applicationDefault() });
}
const db = admin.firestore();
const trips = db.collection('trips');

async function mpFetch(path, options = {}) {
  const response = await fetch(`${MP_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(json.message || `Mercado Pago respondió ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return json;
}

function mapPaymentStatus(mpStatus) {
  if (mpStatus === 'approved') return 'approved';
  if (mpStatus === 'rejected' || mpStatus === 'cancelled') return 'rejected';
  return 'pending';
}

async function syncPayment(paymentId) {
  const payment = await mpFetch(`/v1/payments/${encodeURIComponent(paymentId)}`);
  const tripId = payment.external_reference;
  if (!tripId) return null;

  const ref = trips.doc(tripId);
  const snapshot = await ref.get();
  if (!snapshot.exists) return null;

  const paymentStatus = mapPaymentStatus(payment.status);
  const patch = {
    paymentStatus,
    paymentId: String(payment.id),
    updatedAt: Date.now(),
  };
  if (paymentStatus === 'approved') patch.status = 'paid';
  await ref.update(patch);
  return { tripId, paymentStatus };
}

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/payments/create', async (req, res) => {
  try {
    const { tripId, amount } = req.body || {};
    if (!tripId) return res.status(400).json({ error: 'Falta tripId' });

    const snapshot = await trips.doc(tripId).get();
    if (!snapshot.exists) return res.status(404).json({ error: 'Viaje no encontrado' });
    const trip = snapshot.data();
    if (trip.status === 'paid') return res.status(409).json({ error: 'El viaje ya fue pagado' });

    const trusted = Math.round((trip.fare || 0) + (trip.tip || 0));
    if (!trusted || trusted < 1) return res.status(400).json({ error: 'El viaje no tiene una tarifa final' });
    if (amount !== undefined && Math.round(Number(amount)) !== trusted) {
      console.warn(`Monto del cliente (${amount}) distinto al del viaje (${trusted}); se usa el del viaje`);
    }

    const secure = PUBLIC_URL.startsWith('https://');
    const preference = {
      items: [
        {
          id: tripId,
          title: `Viaje ${tripId.slice(0, 6).toUpperCase()}`,
          quantity: 1,
          currency_id: 'COP',
          unit_price: trusted,
        },
      ],
      external_reference: tripId,
      back_urls: {
        success: `${PUBLIC_URL}/payments/return`,
        failure: `${PUBLIC_URL}/payments/return`,
        pending: `${PUBLIC_URL}/payments/return`,
      },
    };
    if (secure) {
      preference.auto_return = 'approved';
      preference.notification_url = `${PUBLIC_URL}/payments/webhook`;
    }

    const created = await mpFetch('/checkout/preferences', { method: 'POST', body: JSON.stringify(preference) });
    await trips.doc(tripId).update({ paymentPreferenceId: created.id, paymentStatus: 'pending', updatedAt: Date.now() });

    const useSandbox = process.env.MP_USE_SANDBOX === 'true';
    res.json({
      checkoutUrl: useSandbox ? created.sandbox_init_point || created.init_point : created.init_point,
      paymentId: created.id,
    });
  } catch (error) {
    console.error('Error creando el pago:', error.message);
    res.status(500).json({ error: 'No se pudo crear el pago' });
  }
});

/** Retorno del checkout: verifica el pago y muestra una página simple que cierra el WebView */
app.get('/payments/return', async (req, res) => {
  const paymentId = req.query.payment_id || req.query.collection_id;
  let message = 'Pago recibido. Puedes volver a la app.';
  try {
    if (paymentId && paymentId !== 'null') {
      const result = await syncPayment(paymentId);
      if (result?.paymentStatus === 'rejected') message = 'El pago fue rechazado. Vuelve a la app para intentarlo de nuevo.';
      if (result?.paymentStatus === 'pending') message = 'Pago pendiente de confirmación.';
    }
  } catch (error) {
    console.error('Error verificando el retorno:', error.message);
  }
  res.send(
    `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#070A12;color:#F4F7FF;text-align:center;padding:24px"><p style="font-size:18px">${message}</p></body>`,
  );
});

/** Webhook de Mercado Pago: nunca se confía en el cuerpo, se consulta el pago real */
app.post('/payments/webhook', async (req, res) => {
  res.sendStatus(200); // se responde rápido para que Mercado Pago no reintente
  try {
    const topic = req.query.type || req.query.topic || req.body?.type;
    const paymentId = req.query['data.id'] || req.body?.data?.id || req.query.id;
    if (topic === 'payment' && paymentId) await syncPayment(paymentId);
  } catch (error) {
    console.error('Error en el webhook:', error.message);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend de pagos escuchando en el puerto ${PORT} (${PUBLIC_URL})`);
});
