import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useDriverSession } from './DriverSessionContext';
import { useI18n } from './I18nContext';
import useTripRequests from '../hooks/useTripRequests';
import {
  completeTrip as completeTripService,
  getActiveTrip,
  subscribeToTrip,
  updateTripStatus,
} from '../services/tripService';
import { navigate, navigationRef, resetToHome } from '../contracts/navigationRef';
import { ROUTES } from '../contracts/routes';
import { APPROVAL, TRIP_STATUS } from '../contracts/types';

const ActiveTripContext = createContext(null);

export function ActiveTripProvider({ children }) {
  const { driverId, approval, isAvailable } = useDriverSession();
  const { t } = useI18n();
  const [trip, setTrip] = useState(null);
  const tripId = trip?.id;
  const restoredFor = useRef(null);

  const incoming = useTripRequests({
    driverId,
    enabled: Boolean(driverId) && approval === APPROVAL.APPROVED && isAvailable && !trip,
  });

  const incomingId = incoming.request?.id;
  useEffect(() => {
    if (incomingId) navigate(ROUTES.INCOMING_REQUEST);
  }, [incomingId]);

  useEffect(() => {
    if (!driverId) setTrip(null);
  }, [driverId]);

  useEffect(() => {
    if (!driverId) {
      restoredFor.current = null;
      return undefined;
    }
    if (approval !== APPROVAL.APPROVED || restoredFor.current === driverId) return undefined;
    restoredFor.current = driverId;

    let active = true;
    let timer = null;
    (async () => {
      try {
        const found = await getActiveTrip(driverId);
        if (!active || !found) return;
        setTrip(found);

        const target = found.status === TRIP_STATUS.COMPLETED ? ROUTES.PAYMENT_SUMMARY : ROUTES.TRIP_IN_PROGRESS;
        let tries = 0;
        timer = setInterval(() => {
          tries += 1;
          const ready = navigationRef.isReady() && navigationRef.getRootState()?.routeNames?.includes(target);
          if (ready) {
            clearInterval(timer);
            navigate(target);
          } else if (tries > 40) {
            clearInterval(timer);
          }
        }, 250);
      } catch (e) {
        console.warn('Error al buscar un viaje activo:', e);
      }
    })();

    return () => {
      active = false;
      if (timer) clearInterval(timer);
    };
  }, [driverId, approval]);

  useEffect(() => {
    if (!tripId) return undefined;
    const unsubscribe = subscribeToTrip(tripId, (remote) => {
      if (!remote) {
        setTrip(null);
        return;
      }
      if (remote.status === TRIP_STATUS.CANCELLED && remote.cancelledBy !== 'driver') {
        setTrip(null);
        Alert.alert(t('trip.cancelledByPassenger'));
        resetToHome();
        return;
      }
      setTrip(remote);
    });
    return unsubscribe;
  }, [tripId, t]);

  const startTrip = useCallback(async (accepted) => {
    setTrip({ ...accepted, status: TRIP_STATUS.DRIVER_ARRIVING });
    try {
      await updateTripStatus(accepted.id, TRIP_STATUS.DRIVER_ARRIVING);
    } catch (e) {
      console.warn('Error al actualizar el estado del viaje a driver_arriving:', e);
    }
  }, []);

  const setStatus = useCallback(
    async (status, extra = {}) => {
      if (!trip) return;
      try {
        await updateTripStatus(trip.id, status, extra);
        setTrip((prev) => (prev ? { ...prev, ...extra, status } : prev));
      } catch (e) {
        console.warn('Error al actualizar el estado del viaje:', e);
      }
    },
    [trip],
  );

  const completeTrip = useCallback(
    async ({ tip = 0, route } = {}) => {
      if (!trip) return null;
      try {
        const completed = await completeTripService(trip, { tip, route });
        setTrip(completed);
        return completed;
      } catch (e) {
        console.warn('Error al completar el viaje:', e);
        throw e;
      }
    },
    [trip],
  );

  const cancelTrip = useCallback(async () => {
    if (!trip) return;
    const id = trip.id;
    try {
      await updateTripStatus(id, TRIP_STATUS.CANCELLED, { cancelledBy: 'driver' });
    } catch (e) {
      console.warn('Error al cancelar el viaje en el backend:', e);
    }
    setTrip(null);
    resetToHome();
  }, [trip]);

  const clearTrip = useCallback(() => setTrip(null), []);

  const value = useMemo(
    () => ({ trip, incoming, startTrip, setStatus, completeTrip, cancelTrip, clearTrip }),
    [trip, incoming, startTrip, setStatus, completeTrip, cancelTrip, clearTrip],
  );

  return <ActiveTripContext.Provider value={value}>{children}</ActiveTripContext.Provider>;
}

export function useActiveTrip() {
  const ctx = useContext(ActiveTripContext);
  if (!ctx) throw new Error('useActiveTrip debe usarse dentro de <ActiveTripProvider>');
  return ctx;
}