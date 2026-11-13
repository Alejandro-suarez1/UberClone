import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import { getRoute, haversineKm } from './directionService';
import { COLLECTIONS, TRIP_STATUS } from '../contracts/types';

const PLACES = [
  { lat: 6.2086, lng: -75.5659, address: 'Parque Lleras, El Poblado' },
  { lat: 6.2518, lng: -75.5636, address: 'Parque Berrío, Centro' },
  { lat: 6.2565, lng: -75.5903, address: 'Estadio Atanasio Girardot' },
  { lat: 6.2724, lng: -75.5632, address: 'Jardín Botánico' },
  { lat: 6.2713, lng: -75.5659, address: 'Parque Explora' },
  { lat: 6.2199, lng: -75.5906, address: 'Aeropuerto Olaya Herrera' },
  { lat: 6.1988, lng: -75.5736, address: 'Centro Comercial Oviedo' },
  { lat: 6.2415, lng: -75.5898, address: 'Unicentro Medellín' },
  { lat: 6.2788, lng: -75.5784, address: 'Terminal del Norte' },
  { lat: 6.2358, lng: -75.5793, address: 'Cerro Nutibara, Pueblito Paisa' },
  { lat: 6.2674, lng: -75.5686, address: 'Universidad de Antioquia' },
  { lat: 6.2455, lng: -75.5926, address: 'Primer Parque de Laureles' },
  { lat: 6.2471, lng: -75.5683, address: 'Estación San Antonio' },
  { lat: 6.2310, lng: -75.6030, address: 'Parque de Belén' },
];

const pick = (list) => list[Math.floor(Math.random() * list.length)];
const jitter = () => (Math.random() - 0.5) * 0.012; 

function buildPickup(origin) {
  if (!origin) return pick(PLACES);
  return { lat: origin.lat + jitter(), lng: origin.lng + jitter(), address: 'Punto de recogida de prueba' };
}

function buildDestination(pickup) {
  const near = PLACES.filter((place) => {
    const km = haversineKm(pickup, place);
    return km >= 2 && km <= 20;
  });
  if (near.length) return pick(near);

  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  return {
    lat: pickup.lat + sign() * (0.02 + Math.random() * 0.03),
    lng: pickup.lng + sign() * (0.02 + Math.random() * 0.03),
    address: 'Destino de prueba',
  };
}

export async function createDemoRequest({ driverId, origin, category, paymentMethod }) {
  const pickup = buildPickup(origin);
  const destination = buildDestination(pickup);

  const route = await getRoute(pickup, destination);
  const distanceKm = route.distanceKm;
  const durationMin = route.durationMin ?? Math.max(5, Math.round(distanceKm * 3));

  await addDoc(collection(db, COLLECTIONS.TRIPS), {
    driverId,
    passengerId: 'demo-passenger',
    origin: pickup,
    destination,
    distanceKm,
    durationMin,
    category,
    paymentMethod,
    status: TRIP_STATUS.REQUESTED,
    createdAt: Date.now(),
  });
}