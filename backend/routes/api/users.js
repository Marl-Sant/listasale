const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Account } = require('../../db/models');
const router = express.Router();

const validateAccountSignup = [

  check('role')
    .optional({ nullable: true })
    .isIn(['PERSONAL', 'BUSINESS'])
    .withMessage('Role must be either PERSONAL or BUSINESS.'),


  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First name is required.')
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters.'),

 
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last name is required.')
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters.'),

  
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Please provide a valid email.')
    .isLength({ min: 5, max: 255 })
    .withMessage('Email must be between 5 and 255 characters.')
    .bail()
    .custom(async (value) => {
      const email = value.trim().toLowerCase();
      const existing = await Account.findOne({ where: { email } });
      if (existing) {
        throw new Error('Email is already in use.');
      }
      return true;
    }),

  
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required.')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters.')
    .matches(/^[a-zA-Z0-9_.-]+$/)
    .withMessage('Username may only contain letters, numbers, dots, underscores, and dashes.')
    .bail()
    .custom((value) => {
      if (/\S+@\S+\.\S+/.test(value)) {
        throw new Error('Username cannot be an email.');
      }
      return true;
    })
    .bail()
    .custom(async (value) => {
      const username = value.trim();
      const existing = await Account.findOne({ where: { username } });
      if (existing) {
        throw new Error('Username is already in use.');
      }
      return true;
    }),

  
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required.')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),

  
  check('phoneNum')
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      const cleaned = value.replace(/[^\d+]/g, '');
      if (cleaned.length < 7) {
        throw new Error('Phone number appears too short.');
      }
      return true;
    }),

  
  check('zipCode')
    .optional({ nullable: true, checkFalsy: true })
    .matches(/^\d{5}(-\d{4})?$/)
    .withMessage('ZIP code must be a valid US ZIP (e.g., 12345 or 12345-6789).'),

  
  check('profilePic')
    .optional({ nullable: true, checkFalsy: true })
    .isURL()
    .withMessage('Profile picture must be a valid URL.'),

  handleValidationErrors
];

router.post(
  '/', 
  validateAccountSignup,
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
