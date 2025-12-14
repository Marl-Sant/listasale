const express = require('express');
const stripe = require('../../config/stripe');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const {Account} = require('../../db/models')

router.post(
  '/customer-portal',
  requireAuth,
  async (req, res, next) => {
    try {
      const accountId = req.user.id;

      const account = await Account.findByPk(accountId);

      if (!account || !account.stripeCustomerId) {
        return res.status(400).json({
          error:
            'No Stripe customer associated with this account.',
        });
      }

      const portalSession =
        await stripe.billingPortal.sessions.create({
          customer: account.stripeCustomerId,
          return_url: `${process.env.FRONTEND_URL}/billing/manage`,
        });

      return res.json({ url: portalSession.url });
    } catch (err) {
      console.error(
        '❌ Error creating billing portal session:',
        err
      );
      next(err);
    }
  }
);


router.post(
  '/create-checkout-session',
  async (req, res, next) => {
    try {
      
      const { priceId, quantity = 1 } = req.body;

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            price: priceId,
            quantity,
          },
        ],
        success_url: `${process.env.FRONTEND_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/billing/cancelled`,
        customer_email: req.user?.email, 
      });

      return res.json({ url: session.url });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/create-subscription-session',
  async (req, res, next) => {
    try {
      const { priceId } = req.body;

      console.log(
        '➡️ /create-subscription-session body:',
        req.body
      );
      console.log('➡️ req.user:', req.user.dataValues.id);

      if (!priceId) {
        return res
          .status(400)
          .json({ error: 'Missing priceId' });
      }

      if (!req.user || !req.user.email) {
        return res
          .status(401)
          .json({ error: 'Must be logged in to subscribe' });
      }

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        customer_email: req.user.email,
        client_reference_id: String(req.user.dataValues.id),
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.FRONTEND_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/billing/cancelled`,
      });

      console.log(
        ' !!! --- !!! Created subscription session:',
        session.id
      );

      return res.json({ url: session.url });
    } catch (err) {
      console.error('!!! --- !!! Stripe subscription error:', err);
      console.error('!!! --- !!! Stripe subscription error:', err);
      
      return res
        .status(500)
        .json({ error: err.message || 'Internal error' });
    }
  }
);

module.exports = router;
