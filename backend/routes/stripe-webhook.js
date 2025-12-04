// backend/routes/stripe-webhook.js
const express = require('express');
const Stripe = require('stripe');
const { Account } = require('../db/models'); // adjust path
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20'
});

// SAME ARRAY EXPORT AS BEFORE
async function stripeWebhookHandler(req, res) {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.sendStatus(400);
  }

  console.log('✅ Stripe event:', event.type);

  try {
    switch (event.type) {
      // 1) Checkout Session completed – subscription sign-up
      case 'checkout.session.completed': {
        const session = event.data.object;

        // Only care about subscription flows
        if (session.mode === 'subscription') {
          const stripeCustomerId = session.customer;
          // session.subscription is usually an ID string
          const stripeSubscriptionId = session.subscription; 

          console.log(
            '💳 checkout.session.completed for customer',
            stripeCustomerId,
            'subscription',
            stripeSubscriptionId
          );

          // You need to decide how to find the Account.
          // Common options:
          //  - Use session.client_reference_id (you set it when creating the Checkout Session)
          //  - Use session.customer_email and look up Account by email

          // Example if you used client_reference_id = Account.id:
          const accountId = session.client_reference_id;

          if (!accountId) {
            console.warn('⚠️ No client_reference_id on session – cannot map to Account');
            break;
          }

          const account = await Account.findByPk(accountId);
          if (!account) {
            console.warn('⚠️ No Account found for id', accountId);
            break;
          }

          // Optionally, fetch full subscription from Stripe for status
          const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);

          await account.update({
            stripeCustomerId,
            stripeSubscriptionId,
            subscriptionStatus: subscription.status // 'active', 'trialing', etc.
          });

          console.log(
            `✅ Stored subscription on Account ${account.id}:`,
            stripeSubscriptionId,
            subscription.status
          );
        }
        break;
      }

      // 2) Subscription lifecycle – keep status in sync
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.paused':
      case 'customer.subscription.resumed':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;

        const stripeCustomerId = subscription.customer;
        const stripeSubscriptionId = subscription.id;
        const status = subscription.status; // 'active', 'canceled', etc.

        console.log(
          `🔄 Subscription event ${event.type} for sub=${stripeSubscriptionId}, customer=${stripeCustomerId}, status=${status}`
        );

        // Find account via customer
        const account = await Account.findOne({
          where: { stripeCustomerId }
        });

        if (!account) {
          console.warn(
            `⚠️ No Account found for stripeCustomerId=${stripeCustomerId}`
          );
          break;
        }

        await account.update({
          stripeSubscriptionId,
          subscriptionStatus: status
        });

        console.log(
          `✅ Updated Account ${account.id} subscription to status=${status}`
        );
        break;
      }

      // 3) One-time payment example (keep as needed)
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log('💰 PaymentIntent succeeded:', paymentIntent.id);
        // e.g. log one-time purchases here
        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type ${event.type}`);
    }

    return res.sendStatus(200);
  } catch (err) {
    console.error('❌ Error in webhook handler:', err);
    return res.sendStatus(500);
  }
}

module.exports = stripedWebhookRoute = [
  express.raw({ type: 'application/json' }),
  stripeWebhookHandler
];
