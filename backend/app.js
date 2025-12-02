const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const stripeWebhookRoute = require('./routes/stripe-webhook');
const routes = require('./routes');
const { ValidationError } = require('sequelize');
const isProduction = environment === 'production';

const app = express();



// 1) STRIPE WEBHOOK: NO CSRF, RAW BODY
app.post('/api/stripe/webhook', stripeWebhookRoute);

// 2) Normal middleware for everything else
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// if (!isProduction) {
//   app.use(cors());
// }

if (!isProduction) {
  app.use(cors()); // localhost dev
} else {
  const allowedOrigin = process.env.FRONTEND_URL; // e.g. https://listasale-frontend.onrender.com
  app.use(
    cors({
      origin: allowedOrigin,
      credentials: true
    })
  );
}

app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin',
  })
);

// 3) CSRF APPLIES ONLY TO ALL OTHER /api ROUTES
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true,
    },
  })
);

// 4) Your normal API routes (CSRF-protected)
app.use(routes);

// 5) 404 + error handlers unchanged ...
app.use((_req, _res, next) => {
  const err = new Error(
    "The requested resource couldn't be found."
  );
  err.title = 'Resource Not Found';
  err.errors = {
    message: "The requested resource couldn't be found.",
  };
  err.status = 404;
  next(err);
});

app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
