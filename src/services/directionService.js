// AI-assisted: see docs/AI_LOG.md #B-4
const OSRM_BASE = 'https://router.project-osrm.org/route/v1/driving';

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

  try {
    const url =
      `${OSRM_BASE}/${origin.lng},${origin.lat};${destination.lng},${destination.lat}` +
      '?overview=full&geometries=geojson';
    const response = await fetch(url);
    if (!response.ok) return straight;

    const json = await response.json();
    const route = json.routes?.[0];
    if (json.code !== 'Ok' || !route) return straight;

    const result = {
      coordinates: route.geometry.coordinates.map(([lng, lat]) => ({
        latitude: lat,
        longitude: lng,
      })),
      distanceKm: parseFloat((route.distance / 1000).toFixed(2)),
      durationMin: Math.max(1, Math.round(route.duration / 60)),
      approximate: false,
    };

    if (cache.size >= CACHE_LIMIT) {
      cache.delete(cache.keys().next().value);
    }
    cache.set(cacheKey, result);
    return result;
  } catch (e) {
    console.error('Error consultando OSRM:', e);
    return straight;
  }
}

export function navigationUrl(destination) {
  return `https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}&travelmode=driving`;
}