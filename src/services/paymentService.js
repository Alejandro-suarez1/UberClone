// AI-assisted: see docs/AI_LOG.md #B-5
import { ENV } from '../config/env';

export async function createPayment(tripId, amount) {
  if (!ENV.BACKEND_URL) {
    throw new Error('BACKEND_NOT_CONFIGURED');
  }
  
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    throw new Error('INVALID_AMOUNT');
  }

  const response = await fetch(`${ENV.BACKEND_URL}/payments/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tripId, amount }),
  });
  
  const json = await response.json().catch(() => ({}));
  if (!response.ok || !json.checkoutUrl) {
    throw new Error(json.error || 'PAYMENT_CREATE_FAILED');
  }
  return { checkoutUrl: json.checkoutUrl, paymentId: json.paymentId };
}

export function isPaymentReturnUrl(url) {
  return typeof url === 'string' && url.includes('/payments/return');
}