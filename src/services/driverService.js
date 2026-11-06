// AI-assisted: see docs/AI_LOG.md #A-29
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase'; 
import { ENV } from '../config/env';
import { COMMISSION_RATE } from '../config/pricing';
import { APPROVAL, COLLECTIONS } from '../contracts/types';

const driversRef = () => collection(db, COLLECTIONS.DRIVERS);

const withId = (snapshot) => ({ id: snapshot.id, ...snapshot.data() });

/** Busca un conductor por correo. Devuelve el conductor o null. */
export async function findDriverByEmail(email) {
  const clean = String(email || '').trim().toLowerCase();
  const q = query(driversRef(), where('personal.email', '==', clean), limit(1));
  const result = await getDocs(q);
  return result.empty ? null : withId(result.docs[0]);
}

/**
 * Crea el conductor con estado "pending". `data` trae personal, vehicle y documents
 * con las fotos ya subidas (URLs). Devuelve el id.
 */
export async function createDriver(data) {
  const email = String(data.personal.email).trim().toLowerCase();
  if (await findDriverByEmail(email)) {
    throw new Error('EMAIL_EXISTS');
  }
  const payload = {
    ...data,
    personal: { ...data.personal, email },
    approval: APPROVAL.PENDING,
    isAvailable: false,
    commissionRate: COMMISSION_RATE,
    createdAt: Date.now(),
  };
  const created = await addDoc(driversRef(), payload);
  return created.id;
}

export async function getDriver(id) {
  const snapshot = await getDoc(doc(db, COLLECTIONS.DRIVERS, id));
  return snapshot.exists() ? withId(snapshot) : null;
}

/** Acepta rutas con punto, por ejemplo { 'personal.phone': '3001234567' } */
export async function updateDriver(id, patch) {
  await updateDoc(doc(db, COLLECTIONS.DRIVERS, id), patch);
}

/** Escucha cambios del conductor en tiempo real (así se detecta la aprobación). */
export function subscribeToDriver(id, onData, onError) {
  return onSnapshot(
    doc(db, COLLECTIONS.DRIVERS, id),
    (snapshot) => onData(snapshot.exists() ? withId(snapshot) : null),
    (error) => onError?.(error),
  );
}

export async function uploadImage(uri) {
  if (!ENV.CLOUDINARY_CLOUD || !ENV.CLOUDINARY_PRESET) {
    console.warn('[uploadImage] Cloudinary no está configurado; se guarda la ruta local.');
    return uri;
  }
  const fileName = uri.split('/').pop() || 'photo.jpg';
  const extension = (/\.(\w+)$/.exec(fileName)?.[1] || 'jpg').toLowerCase();

  const form = new FormData();
  form.append('file', { uri, name: fileName, type: `image/${extension === 'jpg' ? 'jpeg' : extension}` });
  form.append('upload_preset', ENV.CLOUDINARY_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${ENV.CLOUDINARY_CLOUD}/image/upload`, {
    method: 'POST',
    body: form,
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json?.error?.message || 'UPLOAD_FAILED');
  }
  return json.secure_url;
}
