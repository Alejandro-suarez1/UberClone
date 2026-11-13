// AI-assisted: see docs/AI_LOG.md #B-5
import { ENV } from '../config/env';

export async function createPayment(tripId, amount) {
  if (!ENV.BACKEND_URL) {
    throw new Error('BACKEND_NOT_CONFIGURED');
  }

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    throw new Error('INVALID_AMOUNT');
  }

  const response = await fetch(`${ENV.BACKEND_URL}/payments/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tripId, amount }),
  });

  const json = await response.json().catch(() => ({}));
  if (!response.ok || !json.checkoutUrl) {
    throw new Error(json.error || 'PAYMENT_CREATE_FAILED');
  }
  return { checkoutUrl: json.checkoutUrl, paymentId: json.paymentId };
}

export async function checkPayment(tripId) {
  if (!ENV.BACKEND_URL) {
    throw new Error('BACKEND_NOT_CONFIGURED');
  }
  const response = await fetch(`${ENV.BACKEND_URL}/payments/status/${encodeURIComponent(tripId)}`);
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(json.error || 'PAYMENT_CHECK_FAILED');
  }
  return { paymentStatus: json.paymentStatus || 'pending' };
}

export function isPaymentReturnUrl(url) {
  if (!url || typeof url !== 'string' || !ENV.BACKEND_URL) {
    return false;
  }
  return url.startsWith(`${ENV.BACKEND_URL}/payments/return`);
}