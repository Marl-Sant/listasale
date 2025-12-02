const express = require('express');
const stripe = require('../../config/stripe');
const router = express.Router();

// e.g. POST /api/stripe/create-checkout-session
router.post(
  '/create-checkout-session',
  async (req, res, next) => {
    try {
      // Optionally get user info from your session (req.user) or body
      const { quantity = 1 } = req.body;

      const session = await stripe.checkout.sessions.create({
        mode: 'payment', // or 'payment' for one-time
        line_items: [
          {
            price: "500", // preconfigured price in your Stripe dashboard
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

module.exports = router;
