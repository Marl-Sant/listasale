const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const {
  setTokenCookie,
  restoreUser,
} = require('../../utils/auth');
const { Account } = require('../../db/models');

const router = express.Router();

router.get(
  '/',
  (req, res) => {
    const { user } = req;
    if (user) {
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      return res.json({
        user: safeUser
      });
    } else return res.json({ user: null });
  }
);

router.post('/', async (req, res, next) => {
  const { credential, password } = req.body;

  const account = await Account.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential,
      },
    },
  });

  if (
    !account ||
    !bcrypt.compareSync(
      password,
      account.hashedPassword.toString()
    )
  ) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = {
      credential: 'The provided credentials were invalid.',
    };
    return next(err);
  }

  const safeUser = {
    id: account.id,
    email: account.email,
    username: account.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

module.exports = router;
