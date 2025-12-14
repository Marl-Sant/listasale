const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const { environment } = require('../config');
const isProduction = environment === 'production';

router.use('/api', apiRouter);

// CSRF restore – available in all envs
router.get('/api/csrf/restore', (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie('XSRF-TOKEN', csrfToken, {
    secure: isProduction,
    sameSite: isProduction && 'Lax',
    // httpOnly: false so js-cookie can read it
  });
  res.status(200).json({ 'XSRF-Token': csrfToken });
});

module.exports = router;
