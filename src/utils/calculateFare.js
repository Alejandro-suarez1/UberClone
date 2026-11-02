import { PRICING } from '../config/pricing';

/**
 * @param {{distanceKm:number, durationMin:number, category?:string, tip?:number, commissionRate?:number}} input
 * @returns {{fare:number, commission:number, driverEarnings:number}}
 */
export function calculateFare({
  distanceKm,
  durationMin,
  category = 'economy',
  tip = 0,
  commissionRate = PRICING.commissionRate,
}) {
  const multiplier = PRICING.categoryMultiplier[category];
  if (multiplier === undefined) {
    throw new Error(`Categoría inválida: ${category}`);
  }
  if (!Number.isFinite(distanceKm) || distanceKm < 0 || !Number.isFinite(durationMin) || durationMin < 0) {
    throw new Error('Distancia y duración deben ser números mayores o iguales a 0');
  }

  const raw = (PRICING.baseFare + distanceKm * PRICING.perKm + durationMin * PRICING.perMinute) * multiplier;
  const fare = Math.round(Math.max(PRICING.minimumFare, raw) / PRICING.roundTo) * PRICING.roundTo;
  const commission = Math.round(fare * commissionRate);
  const cleanTip = Math.max(0, Math.round(Number(tip) || 0));

  return {
    fare,
    commission,
    driverEarnings: fare - commission + cleanTip,
  };
}
