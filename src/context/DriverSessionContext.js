import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { subscribeToDriver, updateDriver } from '../services/driverService';
import { APPROVAL } from '../contracts/types';

const SESSION_KEY = 'session.driverId';
const AVAILABLE_KEY = 'pref.lastAvailable';

const DriverSessionContext = createContext(null);

export function DriverSessionProvider({ children }) {
  const [driverId, setDriverId] = useState(null);
  const [driver, setDriver] = useState(null);
  const [driverLoaded, setDriverLoaded] = useState(false);
  const [isAvailable, setIsAvailableState] = useState(false);
  const [restored, setRestored] = useState(false);
  const restoreAvailability = useRef(false);

  const approval = driver?.approval ?? null;

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [savedId, savedAvailable] = await Promise.all([
          AsyncStorage.getItem(SESSION_KEY),
          AsyncStorage.getItem(AVAILABLE_KEY),
        ]);
        if (!active) return;
        restoreAvailability.current = savedAvailable === '1';
        if (savedId) setDriverId(savedId);
      } catch (e) {
      } finally {
        if (active) setRestored(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!driverId) {
      setDriver(null);
      setDriverLoaded(false);
      return undefined;
    }
    const unsubscribe = subscribeToDriver(
      driverId,
      (data) => {
        if (!data) {
          AsyncStorage.multiRemove([SESSION_KEY, AVAILABLE_KEY]).catch(() => {});
          setDriverId(null);
          return;
        }
        setDriver(data);
        setDriverLoaded(true);
      },
      () => setDriverLoaded(true),
    );
    return unsubscribe;
  }, [driverId]);

  useEffect(() => {
    if (!driverLoaded) return;
    if (approval === APPROVAL.APPROVED && restoreAvailability.current) {
      restoreAvailability.current = false;
      setIsAvailableState(true);
    }
    if (approval !== APPROVAL.APPROVED && isAvailable) {
      setIsAvailableState(false);
    }
  }, [driverLoaded, approval, isAvailable]);

  const setAvailable = useCallback(
    (value) => {
      if (!driverId) return false;
      if (value && approval !== APPROVAL.APPROVED) return false; // pendiente o rechazado
      setIsAvailableState(value);
      AsyncStorage.setItem(AVAILABLE_KEY, value ? '1' : '0').catch(() => {});
      updateDriver(driverId, { isAvailable: value }).catch(() => {});
      return true;
    },
    [driverId, approval],
  );

  const signIn = useCallback(async (id) => {
    await AsyncStorage.setItem(SESSION_KEY, id);
    setDriverLoaded(false);
    setDriverId(id);
  }, []);

  const signOut = useCallback(async () => {
    if (driverId) updateDriver(driverId, { isAvailable: false }).catch(() => {});
    await AsyncStorage.multiRemove([SESSION_KEY, AVAILABLE_KEY]).catch(() => {});
    setIsAvailableState(false);
    setDriver(null);
    setDriverLoaded(false);
    setDriverId(null);
  }, [driverId]);

  const ready = restored && (!driverId || driverLoaded);

  const value = useMemo(
    () => ({ driver, driverId, approval, isAvailable, setAvailable, signIn, signOut, ready }),
    [driver, driverId, approval, isAvailable, setAvailable, signIn, signOut, ready],
  );

  return <DriverSessionContext.Provider value={value}>{children}</DriverSessionContext.Provider>;
}

export function useDriverSession() {
  const ctx = useContext(DriverSessionContext);
  if (!ctx) throw new Error('useDriverSession debe usarse dentro de <DriverSessionProvider>');
  return ctx;
}
