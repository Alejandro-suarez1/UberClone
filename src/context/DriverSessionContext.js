// AI-assisted: see docs/AI_LOG.md #A-30
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { subscribeToDriver, updateDriver } from '../services/driverService';
import { APPROVAL } from '../contracts/types';

// En AsyncStorage solo van preferencias y la sesión (el id), nunca datos sensibles
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

  // 1) Recupera la sesión guardada
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
        // sin sesión guardada
      } finally {
        if (active) setRestored(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // 2) Escucha al conductor en tiempo real (la aprobación puede cambiar en la base de datos)
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
          // el documento ya no existe: se cierra la sesión
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

  // 3) Restaura "Disponible" solo si ya está aprobado; si deja de estarlo, se apaga
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

  // "ready" es verdadero cuando ya se sabe si hay sesión y, si la hay, ya llegaron los datos
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
