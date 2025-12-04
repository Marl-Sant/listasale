// 'use client';

// import { useState } from 'react';
// import { createCheckoutSession } from '../../store/stripe';

// export default function StripeTestButton() {
//   const [loading, setLoading] = useState(false);

//   const handleClick = async () => {
//     try {
//       setLoading(true);
//       const url = await createCheckoutSession("price_1SZHEBK6YHcF3szWbXauq02F");
//       window.location.href = url; // redirect to Stripe Checkout
//     } catch (e) {
//       console.error('Failed to create checkout session', e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button disabled={loading} onClick={handleClick}>
//       {loading ? 'Redirecting...' : 'Buy Listing Credit'}
//     </button>
//   );
// }

'use client';

import { useState } from 'react';
import { createCheckoutSession } from '../../store/stripe';

export default function StripeTestButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const url = await createCheckoutSession('price_1SZHEBK6YHcF3szWbXauq02F'); // your one-time price
      window.location.href = url;
    } catch (e) {
      console.error('Failed to create checkout session', e);
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
        btn btn-primary
        inline-flex items-center justify-center
        px-4 py-2 text-sm font-medium
        rounded-lg
        shadow-sm
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-transform duration-150
        hover:-translate-y-[1px]
      "
    >
      {loading ? 'Redirecting…' : 'Test One-Time Payment'}
    </button>
  );
}
