// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

// All API routes mounted here
router.use('/api', apiRouter);

// CSRF restore route in dev (keep this)
// if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({ 'XSRF-Token': csrfToken });
  });
// }

module.exports = router;
