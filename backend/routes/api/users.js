const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Account } = require('../../db/models');
const router = express.Router();

router.post(
  '/',
  async (req, res) => {
    const { 
      firstName,
      lastName,
      username,
      email,
      phoneNum,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      profilePic,
      bio,
      password,
     } = req.body;
    
    const hashedPassword = bcrypt.hashSync(password);
    
    const user = await Account.create({ 
      firstName,
      lastName,
      username,
      email,
      phoneNum,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      profilePic,
      bio,
      hashedPassword,
     });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

module.exports = router;
