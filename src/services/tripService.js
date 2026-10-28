import { collection, doc, getDocs, limit as limitTo, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from 'firebase/firestore';
import { db } from './firebase';
import { calculateFare } from '../utils/calculateFare';
import { COMMISSION_RATE } from '../config/pricing';
import { COLLECTIONS, PAYMENT_METHOD, PAYMENT_STATUS, TRIP_STATUS } from '../contracts/types';

const tripsRef = () => collection(db, COLLECTIONS.TRIPS);
const withId = (snapshot) => ({ id: snapshot.id, ...snapshot.data() });

export function subscribeToRequests(driverId, onRequests, onError) {
  const q = query(tripsRef(), where('driverId', '==', driverId), where('status', '==', TRIP_STATUS.REQUESTED));
  return onSnapshot(
    q,
    (snapshot) => {
      const trips = snapshot.docs.map(withId).sort((a, b) => a.createdAt - b.createdAt);
      onRequests(trips);
    },
    (error) => onError?.(error),
  );
}

export function subscribeToTrip(tripId, onTrip, onError) {
  return onSnapshot(
    doc(db, COLLECTIONS.TRIPS, tripId),
    (snapshot) => onTrip(snapshot.exists() ? withId(snapshot) : null),
    (error) => onError?.(error),
  );
}

export async function updateTripStatus(tripId, status, extra = {}) {
  await updateDoc(doc(db, COLLECTIONS.TRIPS, tripId), { status, ...extra, updatedAt: Date.now() });
}

export async function completeTrip(trip, { tip = 0, route } = {}) {
  const { fare, commission, driverEarnings } = calculateFare({
    distanceKm: trip.distanceKm,
    durationMin: trip.durationMin,
    category: trip.category,
    tip,
    commissionRate: COMMISSION_RATE,
  });
  const patch = {
    fare,
    commission,
    tip,
    driverEarnings,
    commissionRate: COMMISSION_RATE,
    paymentStatus: PAYMENT_STATUS.PENDING,
    completedAt: Date.now(),
  };
  if (Array.isArray(route) && route.length > 1) patch.route = route;

  await updateTripStatus(trip.id, TRIP_STATUS.COMPLETED, patch);
  return { ...trip, ...patch, status: TRIP_STATUS.COMPLETED };
}

export async function markCashReceived(tripId) {
  await updateTripStatus(tripId, TRIP_STATUS.PAID, {
    paymentMethod: PAYMENT_METHOD.CASH,
    paymentStatus: PAYMENT_STATUS.CASH,
  });
}

export async function updateDriverLocation(driverId, place) {
  await setDoc(
    doc(db, COLLECTIONS.DRIVER_LOCATIONS, driverId),
    { lat: place.lat, lng: place.lng, updatedAt: Date.now() },
    { merge: true },
  );
}

export async function getDriverTrips(driverId, { since, until, paymentMethod, cursor, limit = 20 } = {}) {
  const trips = [];
  let lastCreatedAt = cursor ?? null;
  let exhausted = false;
  let rounds = 0;

  while (trips.length < limit && !exhausted && rounds < 5) {
    const constraints = [where('driverId', '==', driverId)];
    if (since !== undefined) constraints.push(where('createdAt', '>=', since));
    if (until !== undefined) constraints.push(where('createdAt', '<=', until));
    constraints.push(orderBy('createdAt', 'desc'));
    if (lastCreatedAt !== null) constraints.push(startAfter(lastCreatedAt));
    constraints.push(limitTo(limit));

    const snapshot = await getDocs(query(tripsRef(), ...constraints));
    const page = snapshot.docs.map(withId);
    if (page.length < limit) exhausted = true;
    if (page.length > 0) lastCreatedAt = page[page.length - 1].createdAt;

    const wanted = page.filter((trip) => {
      const finished = trip.status === TRIP_STATUS.COMPLETED || trip.status === TRIP_STATUS.PAID;
      return finished && (!paymentMethod || trip.paymentMethod === paymentMethod);
    });
    trips.push(...wanted);
    rounds += 1;
  }

  const pageTrips = trips.slice(0, limit);
  const hasMore = !exhausted || trips.length > limit;
  let nextCursor = null;
  if (hasMore) {
    nextCursor = trips.length > limit ? pageTrips[pageTrips.length - 1].createdAt : lastCreatedAt;
  }
  return { trips: pageTrips, nextCursor };
}
