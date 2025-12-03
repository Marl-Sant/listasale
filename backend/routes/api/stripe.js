const express = require('express');
const stripe = require('../../config/stripe');
const router = express.Router();

// e.g. POST /api/stripe/create-checkout-session
router.post(
  '/create-checkout-session',
  async (req, res, next) => {
    try {
      // Optionally get user info from your session (req.user) or body
      const { priceId, quantity = 1 } = req.body;

      const session = await stripe.checkout.sessions.create({
        mode: 'payment', // or 'payment' for one-time
        line_items: [
          {
            price: priceId, // preconfigured price in your Stripe dashboard
            quantity,
          },
        ],
        success_url: `${process.env.FRONTEND_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/billing/cancelled`,
        customer_email: req.user?.email, // if you store users in req.user
      });

      return res.json({ url: session.url });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/create-subscription-session", async (req, res, next) => {
  try {
    const { priceId } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: "Missing priceId" });
    }

    // Must have user logged in
    if (!req.user || !req.user.email) {
      return res.status(401).json({ error: "Must be logged in to subscribe" });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: req.user.email,
      line_items: [
        {
          price: priceId, // e.g. "price_1234" from Stripe Dashboard
          quantity: 1
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/billing/cancelled`,
      automatic_tax: { enabled: true }
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe subscription error:", err);
    next(err);
  }
});

module.exports = router;
