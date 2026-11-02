import { useCallback, useEffect, useRef, useState } from 'react';
import { subscribeToRequests, updateTripStatus } from '../services/tripService';
import { REQUEST_TIMEOUT_SECONDS } from '../config/env';
import { TRIP_STATUS } from '../contracts/types';

/**
 * @returns {{ request: object|null, secondsLeft: number, accept: () => Promise<object|null>, reject: () => Promise<void> }}
 */
export default function useTripRequests({ driverId, enabled }) {
  const [request, setRequest] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const requestRef = useRef(null);
  const handledIds = useRef(new Set());
  const rejectRef = useRef(null);

  useEffect(() => {
    requestRef.current = request;
  }, [request]);

  useEffect(() => {
    if (!enabled || !driverId) {
      setRequest(null);
      return undefined;
    }
    const unsubscribe = subscribeToRequests(driverId, (trips) => {
      setRequest((current) => {
        if (current) {
          return trips.some((trip) => trip.id === current.id) ? current : null;
        }
        return trips.find((trip) => !handledIds.current.has(trip.id)) || null;
      });
    });
    return unsubscribe;
  }, [driverId, enabled]);

  const reject = useCallback(
    async (reason) => {
      const current = requestRef.current;
      if (!current) return;
      handledIds.current.add(current.id);
      setRequest(null);
      try {
        await updateTripStatus(current.id, TRIP_STATUS.REJECTED, {
          rejectedBy: driverId,
          rejectReason: reason === 'timeout' ? 'timeout' : 'driver',
        });
      } catch (e) {
        console.warn('Error al rechazar la solicitud en el backend:', e);
      }
    },
    [driverId],
  );

  useEffect(() => {
    rejectRef.current = reject;
  }, [reject]);

  const accept = useCallback(async () => {
    const current = requestRef.current;
    if (!current) return null;
    handledIds.current.add(current.id);
    setRequest(null);
    try {
      await updateTripStatus(current.id, TRIP_STATUS.ACCEPTED, { acceptedAt: Date.now() });
      return { ...current, status: TRIP_STATUS.ACCEPTED };
    } catch (e) {
      handledIds.current.delete(current.id);
      setRequest(current);
      throw e;
    }
  }, []);

  const requestId = request?.id;
  useEffect(() => {
    if (!requestId) {
      setSecondsLeft(0);
      return undefined;
    }
    const deadline = Date.now() + REQUEST_TIMEOUT_SECONDS * 1000;
    setSecondsLeft(REQUEST_TIMEOUT_SECONDS);

    const timer = setInterval(() => {
      const left = Math.ceil((deadline - Date.now()) / 1000);
      if (left <= 0) {
        clearInterval(timer);
        setSecondsLeft(0);
        rejectRef.current?.('timeout');
      } else {
        setSecondsLeft(left);
      }
    }, 250);

    return () => clearInterval(timer);
  }, [requestId]);

  return { request, secondsLeft, accept, reject };
}