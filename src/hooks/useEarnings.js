// AI-assisted: see docs/AI_LOG.md #A-38
import { useMemo } from 'react';
import { startOfDay, startOfMonth, startOfWeek } from '../utils/dateRanges';
import { PAYMENT_METHOD, TRIP_STATUS } from '../contracts/types';

const EMPTY = { count: 0, billed: 0, commissions: 0, tips: 0, net: 0, average: 0 };

function summarize(trips) {
  if (trips.length === 0) return { ...EMPTY };
  const totals = trips.reduce(
    (acc, trip) => ({
      count: acc.count + 1,
      billed: acc.billed + (trip.fare || 0),
      commissions: acc.commissions + (trip.commission || 0),
      tips: acc.tips + (trip.tip || 0),
      net: acc.net + (trip.driverEarnings || 0),
    }),
    { count: 0, billed: 0, commissions: 0, tips: 0, net: 0 },
  );
  return { ...totals, average: Math.round(totals.net / totals.count) };
}

const isFinished = (trip) => trip.status === TRIP_STATUS.COMPLETED || trip.status === TRIP_STATUS.PAID;

export default function useEarnings(trips) {
  return useMemo(() => {
    const finished = (trips || []).filter(isFinished);
    const now = new Date();
    const dayStart = startOfDay(now).getTime();
    const weekStart = startOfWeek(now).getTime();
    const monthStart = startOfMonth(now).getTime();

    const since = (from) => finished.filter((trip) => (trip.completedAt || trip.createdAt) >= from);

    const balance = finished.reduce((acc, trip) => {
      if (trip.paymentMethod === PAYMENT_METHOD.CASH) {
        return trip.status === TRIP_STATUS.PAID ? acc - (trip.commission || 0) : acc;
      }
      return trip.status === TRIP_STATUS.PAID ? acc + (trip.driverEarnings || 0) : acc;
    }, 0);

    return {
      today: summarize(since(dayStart)),
      week: summarize(since(weekStart)),
      month: summarize(since(monthStart)),
      balance,
    };
  }, [trips]);
}
