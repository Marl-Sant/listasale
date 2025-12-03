"use client";

import { useState } from "react";
import { csrfFetch } from "../../store/csrf";

export default function StripeSubTestButton() {
  const [loading, setLoading] = useState(false);

  const startSubscription = async () => {
    setLoading(true);
    try {
      const res = await csrfFetch("/api/stripe/create-subscription-session", {
        method: "POST",
        body: JSON.stringify({
          priceId: "price_1SZHCpK6YHcF3szWQNRSJs3s" // REPLACE THIS
        }),
      });

      const data = await res.json();
      window.location.href = data.url; // redirect to Stripe
    } catch (err) {
      console.error("Subscription error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button disabled={loading} onClick={startSubscription}>
      {loading ? "Redirecting…" : "Subscribe Monthly"}
    </button>
  );
}
