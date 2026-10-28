export const PRICING = {
  baseFare: 3500,
  perKm: 1200,
  perMinute: 250,
  minimumFare: 6000,
  roundTo: 100, 
  commissionRate: 0.2, 
  categoryMultiplier: {
    economy: 1.0,
    xl: 1.4,
    premium: 1.8,
  },
  minSeats: {
    economy: 1,
    xl: 6,
    premium: 1,
  },
  technicalReviewFromAge: 5,
};

export const COMMISSION_RATE = PRICING.commissionRate;
