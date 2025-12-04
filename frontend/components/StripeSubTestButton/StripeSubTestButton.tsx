// "use client";

// import { useState } from "react";
// import { csrfFetch } from "../../store/csrf";

// export default function StripeSubTestButton() {
//   const [loading, setLoading] = useState(false);

//   const startSubscription = async () => {
//     setLoading(true);
//     try {
//       const res = await csrfFetch("/api/stripe/create-subscription-session", {
//         method: "POST",
//         body: JSON.stringify({
//           priceId: "price_1SZHCpK6YHcF3szWQNRSJs3s" // REPLACE THIS
//         }),
//       });

//       const data = await res.json();
//       window.location.href = data.url; // redirect to Stripe
//     } catch (err) {
//       console.error("Subscription error", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button disabled={loading} onClick={startSubscription}>
//       {loading ? "Redirecting…" : "Subscribe Monthly"}
//     </button>
//   );
// }


'use client';

import { useState } from 'react';
import { createSubscriptionSession } from '../../store/stripe'; // or wherever you put it

export default function StripeSubTestButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const url = await createSubscriptionSession('price_1SZHCpK6YHcF3szWQNRSJs3s'); // your subscription price
      window.location.href = url;
    } catch (e) {
      console.error('Failed to create subscription session', e);
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
        btn btn-outline-primary
        inline-flex items-center justify-center
        px-4 py-2 text-sm font-medium
        rounded-lg
        shadow-sm
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-transform duration-150
        hover:-translate-y-[1px]
      "
    >
      {loading ? 'Redirecting…' : 'Test Subscription'}
    </button>
  );
}
