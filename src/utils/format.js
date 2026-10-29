export function formatCOP(value) {
  const n = Math.round(Number(value) || 0);
  const sign = n < 0 ? '-' : '';
  return `${sign}$${String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

const pad = (n) => String(n).padStart(2, '0');

export function toISODate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseISODate(iso) {
  if (typeof iso !== 'string') return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const [, y, m, d] = match.map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

export function formatISODate(iso) {
  const date = parseISODate(iso);
  return date ? `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}` : '';
}

export function formatDate(ts) {
  const d = new Date(ts);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export function formatDateTime(ts) {
  const d = new Date(ts);
  return `${formatDate(ts)} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatKm(km) {
  return `${(Math.round((Number(km) || 0) * 10) / 10).toString().replace('.', ',')} km`;
}

export function placeLabel(place) {
  if (!place) return '';
  if (place.address) return place.address;
  return `${Number(place.lat).toFixed(4)}, ${Number(place.lng).toFixed(4)}`;
}
