// backend/routes/stripe-webhook.js
const express = require('express');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20'
});

// export a plain handler function
async function stripeWebhookHandler(req, res) {
  console.log('🔥 Stripe webhook route hit');

  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw body (Buffer)
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.sendStatus(400);
  }

  console.log('✅ Event type:', event.type);

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log('💰 PaymentIntent succeeded:', paymentIntent.id);
    // TODO: update your DB / user subscription here
  }

  return res.sendStatus(200);
}

module.exports = stripedWebhookRoute = [
  // raw body middleware ONLY for this route
  express.raw({ type: 'application/json' }),
  stripeWebhookHandler
];
