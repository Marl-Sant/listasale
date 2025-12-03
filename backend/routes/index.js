// // backend/routes/index.js
// const express = require('express');
// const router = express.Router();
// const apiRouter = require('./api');

// // All API routes mounted here
// router.use('/api', apiRouter);

// // CSRF restore route in dev (keep this)
// // if (process.env.NODE_ENV !== 'production') {
// //   router.get('/api/csrf/restore', (req, res) => {
// //     const csrfToken = req.csrfToken();
// //     res.cookie('XSRF-TOKEN', csrfToken);
// //     res.status(200).json({ 'XSRF-Token': csrfToken });
// //   });
// // }

// // CSRF restore route – available in ALL envs now
// router.get('/api/csrf/restore', (req, res) => {
//   const csrfToken = req.csrfToken();
//   res.cookie('XSRF-TOKEN', csrfToken, {
//     secure: isProduction,
//     sameSite: isProduction && 'Lax'
//     // httpOnly not set → cookie is readable by js-cookie
//   });
//   res.status(200).json({ 'XSRF-Token': csrfToken });
// });

// module.exports = router;
// backend/routes/index.js
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
