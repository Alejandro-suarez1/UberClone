// AI-assisted: see docs/AI_LOG.md #B-7
import { useEffect, useState } from 'react';
import { useDriverSession } from '../context/DriverSessionContext';
import { requestLocationPermission, watchPlace } from '../services/locationService';
import { updateDriverLocation } from '../services/tripService';

/**
 * @returns {{ location: {lat:number,lng:number}|null, error: 'permission'|'unavailable'|null }}
 */
export default function useDriverLocation({ enabled }) {
  const { driverId } = useDriverSession();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !driverId) return undefined;

    let cancelled = false;
    let subscription = null;
    let lastSavedLocation = null;

    (async () => {
      try {
        const granted = await requestLocationPermission();
        if (cancelled) return;
        if (!granted) {
          setError('permission');
          return;
        }
        setError(null);
        
        const sub = await watchPlace((place) => {
          if (cancelled) return;
          
          if (
            lastSavedLocation && 
            lastSavedLocation.lat === place.lat && 
            lastSavedLocation.lng === place.lng
          ) {
            return;
          }

          lastSavedLocation = place;
          setLocation(place);
          updateDriverLocation(driverId, place).catch((err) => {
            console.error("Error al actualizar ubicación en BD:", err);
          });
        });

        if (cancelled) {
          sub.remove();
        } else {
          subscription = sub;
        }
      } catch (e) {
        if (!cancelled) {
          setError('unavailable');
          console.error("Error en el servicio de geolocalización:", e);
        }
      }
    })();

    return () => {
      cancelled = true;
      if (subscription) subscription.remove();
    };
  }, [enabled, driverId]);

  return { location, error };
}
