// AI-assisted: see docs/AI_LOG.md #B-4
import { ENV } from '../config/env';

export function decodePolyline(encoded) {
  const points = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let result = 0;
    let shift = 0;
    let byte;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;

    result = 0;
    shift = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;

    points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }
  return points;
}

export function haversineKm(a, b) {
  const rad = (deg) => (deg * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

const CACHE_LIMIT = 50;
const cache = new Map();
const key = (a, b) => `${a.lat.toFixed(4)},${a.lng.toFixed(4)}>${b.lat.toFixed(4)},${b.lng.toFixed(4)}`;

export async function getRoute(origin, destination) {
  const cacheKey = key(origin, destination);
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const straight = {
    coordinates: [
      { latitude: origin.lat, longitude: origin.lng },
      { latitude: destination.lat, longitude: destination.lng },
    ],
    distanceKm: parseFloat(haversineKm(origin, destination).toFixed(2)),
    durationMin: null,
    approximate: true,
  };

  if (!ENV.GOOGLE_MAPS_KEY) return straight;

  try {
    const url =
      'https://maps.googleapis.com/maps/api/directions/json' +
      `?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}` +
      `&mode=driving&key=${ENV.GOOGLE_MAPS_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    const route = json.routes?.[0];
    if (json.status !== 'OK' || !route) return straight;

    const leg = route.legs[0];
    const result = {
      coordinates: decodePolyline(route.overview_polyline.points),
      distanceKm: parseFloat((leg.distance.value / 1000).toFixed(2)),
      durationMin: Math.round(leg.duration.value / 60),
      approximate: false,
    };

    if (cache.size >= CACHE_LIMIT) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(cacheKey, result);
    return result;
  } catch (e) {
    console.error('Error en directionsService:', e);
    return straight;
  }
}

export function navigationUrl(destination) {
  return `https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}&travelmode=driving`;
}
