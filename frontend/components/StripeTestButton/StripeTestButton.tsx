'use client';

import { useState } from 'react';
import { createCheckoutSession } from '../../store/stripe';

export default function StripeTestButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const url = await createCheckoutSession('price_12345');
      window.location.href = url; // redirect to Stripe Checkout
    } catch (e) {
      console.error('Failed to create checkout session', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button disabled={loading} onClick={handleClick}>
      {loading ? 'Redirecting...' : 'Subscribe'}
    </button>
  );
}
