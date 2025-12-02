'use client';

import { csrfFetch } from './csrf';

export async function createCheckoutSession(priceId: string, quantity = 1) {
  const res = await csrfFetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify({ priceId, quantity }),
  });

  if (!res.ok) throw res;

  const data = await res.json();
  return data.url as string;
}
