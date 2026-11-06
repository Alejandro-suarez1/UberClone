// AI-assisted: see docs/AI_LOG.md #A-39
import { calculateFare } from './calculateFare';
import { PAYMENT_METHOD, TRIP_STATUS } from '../contracts/types';

/**
 * Viajes de ejemplo para trabajar historial y ganancias sin esperar el backend.
 * Se activan con EXPO_PUBLIC_USE_MOCKS=true. Misma forma que tripService.getDriverTrips.
 */
const PLACES = [
  { lat: 4.711, lng: -74.0721, address: 'Plaza de Bolívar' },
  { lat: 4.6486, lng: -74.0627, address: 'Parque de la 93' },
  { lat: 4.6097, lng: -74.0817, address: 'Aeropuerto El Dorado' },
  { lat: 4.7021, lng: -74.0418, address: 'Centro Andino' },
  { lat: 4.6351, lng: -74.0703, address: 'Universidad Nacional' },
  { lat: 4.6682, lng: -74.0531, address: 'Zona T' },
];
const CATEGORIES = ['economy', 'economy', 'xl', 'premium'];
const METHODS = [PAYMENT_METHOD.MERCADOPAGO, PAYMENT_METHOD.CASH, PAYMENT_METHOD.MERCADOPAGO, PAYMENT_METHOD.STRIPE];
const TIPS = [0, 0, 1000, 2000, 5000];

function buildMockTrips(count = 40) {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => {
    const origin = PLACES[i % PLACES.length];
    const destination = PLACES[(i * 3 + 2) % PLACES.length];
    const distanceKm = 3 + ((i * 7) % 15) + 0.5;
    const durationMin = 10 + ((i * 5) % 30);
    const category = CATEGORIES[i % CATEGORIES.length];
    const paymentMethod = METHODS[i % METHODS.length];
    const tip = TIPS[i % TIPS.length];
    const { fare, commission, driverEarnings } = calculateFare({ distanceKm, durationMin, category, tip });
    const createdAt = now - i * 5.5 * 60 * 60 * 1000; // uno cada ~5 horas hacia atrás
    return {
      id: `mock-${i + 1}`,
      driverId: 'mock-driver',
      passengerId: `mock-passenger-${i + 1}`,
      origin,
      destination,
      distanceKm,
      durationMin,
      category,
      fare,
      commission,
      tip,
      driverEarnings,
      commissionRate: 0.2,
      paymentMethod,
      paymentStatus: paymentMethod === PAYMENT_METHOD.CASH ? 'cash' : i % 9 === 0 ? 'pending' : 'approved',
      status: i % 9 === 0 ? TRIP_STATUS.COMPLETED : TRIP_STATUS.PAID,
      rating: 3 + (i % 3),
      createdAt,
      completedAt: createdAt + durationMin * 60 * 1000,
    };
  });
}

const MOCK_TRIPS = buildMockTrips();

export async function getMockDriverTrips(_driverId, { since, until, paymentMethod, cursor, limit = 20 } = {}) {
  await new Promise((resolve) => setTimeout(resolve, 350)); // simula la red
  const filtered = MOCK_TRIPS.filter(
    (trip) =>
      (since === undefined || trip.createdAt >= since) &&
      (until === undefined || trip.createdAt <= until) &&
      (!paymentMethod || trip.paymentMethod === paymentMethod) &&
      (cursor === undefined || cursor === null || trip.createdAt < cursor),
  ).sort((a, b) => b.createdAt - a.createdAt);

  const trips = filtered.slice(0, limit);
  const hasMore = filtered.length > limit;
  return { trips, nextCursor: hasMore ? trips[trips.length - 1].createdAt : null };
}
