// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const stripeRouter = require('./stripe.js')
const locationsRouter = require('./locations.js')
const estateSalesRouter = require('./estate-sales.js')
const itemListingsRouter = require('./item-listings.js')
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/locations', locationsRouter)

router.use('/estate-sales', estateSalesRouter)

router.use('/itemListingsRouter', itemListingsRouter)

router.use('/stripe', stripeRouter)


router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
