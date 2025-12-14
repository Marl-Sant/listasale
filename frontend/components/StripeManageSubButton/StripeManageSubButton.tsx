'use client';

import { useState } from 'react';
import { csrfFetch } from '../../store/csrf';

export default function StripeManageSubButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      const res = await csrfFetch('/api/stripe/customer-portal', {
        method: 'POST'
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No portal URL returned:', data);
      }
    } catch (err) {
      console.error('Failed to open Stripe customer portal', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleClick}
      className="
        btn btn-outline-secondary
        inline-flex items-center justify-center
        px-4 py-2 text-sm font-medium
        rounded-lg shadow-sm
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-transform duration-150
        hover:-translate-y-[1px]
      "
    >
      {loading ? 'Opening…' : 'Manage Subscription'}
    </button>
  );
}
