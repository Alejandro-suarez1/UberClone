import * as Location from 'expo-location';
import { LOCATION_INTERVAL_MS } from '../config/env';

export async function requestLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

const toPlace = (coords) => ({
  lat: coords.latitude,
  lng: coords.longitude,
});

export async function getCurrentPlace() {
  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  return toPlace(position.coords);
}

export function watchPlace(
  onPlace,
  { intervalMs = LOCATION_INTERVAL_MS } = {}
) {
  return Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: intervalMs,
      distanceInterval: 10,
    },
    (position) => onPlace(toPlace(position.coords))
  );
}

export function stopWatchingPlace(subscription) {
  if (subscription) {
    subscription.remove();
  }
}
