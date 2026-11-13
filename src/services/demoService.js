import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import { getRoute } from './directionService';
import { COLLECTIONS, TRIP_STATUS } from '../contracts/types';

const MEDELLIN_PLACES = [
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

function pickTwoDifferent() {
  const pickupIndex = Math.floor(Math.random() * MEDELLIN_PLACES.length);
  let destinationIndex = Math.floor(Math.random() * (MEDELLIN_PLACES.length - 1));
  if (destinationIndex >= pickupIndex) destinationIndex += 1;
  return [MEDELLIN_PLACES[pickupIndex], MEDELLIN_PLACES[destinationIndex]];
}

export async function createDemoRequest({ driverId, category, paymentMethod }) {
  const [pickup, destination] = pickTwoDifferent();

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