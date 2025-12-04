'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      // This is where I will make associations later, e.g.:
      // Account.hasOne(models.BusinessProfile, { foreignKey: 'accountId', as: 'businessProfile' });
    }
  }

  Account.init(
    {
      role: {
        type: DataTypes.ENUM('PERSONAL', 'BUSINESS'),
        allowNull: false,
        defaultValue: 'PERSONAL',
        validate: {
          isIn: {
            args: [['PERSONAL', 'BUSINESS']],
            msg: 'Role must be either PERSONAL or BUSINESS.',
          },
        },
      },

      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'First name is required.' },
          len: {
            args: [1, 50],
            msg: 'First name must be between 1 and 50 characters.',
          },
        },
      },

      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Last name is required.' },
          len: {
            args: [1, 50],
            msg: 'Last name must be between 1 and 50 characters.',
          },
        },
      },

      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: {
          name: 'unique_username',
          msg: 'Username is already in use.',
        },
        validate: {
          notEmpty: { msg: 'Username is required.' },
          len: {
            args: [3, 30],
            msg: 'Username must be between 3 and 30 characters.',
          },
          is: {
            args: /^[a-zA-Z0-9_.-]+$/i,
            msg: 'Username may only contain letters, numbers, dots, underscores, and dashes.',
          },
        },
      },

      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
          name: 'unique_email',
          msg: 'Email address is already in use.',
        },
        validate: {
          notEmpty: { msg: 'Email is required.' },
          isEmail: { msg: 'Must be a valid email address.' },
          len: {
            args: [5, 255],
            msg: 'Email must be between 5 and 255 characters.',
          },
        },
      },

      phoneNum: {
        type: DataTypes.STRING(12),
        allowNull: true,
        validate: {
          isValidPhone(value) {
            if (!value) return;
            const cleaned = value.replace(/[^\d+]/g, '');
            if (cleaned.length < 10) {
              throw new Error('Phone number appears too short.');
            }
          },
        },
      },

      addressLine1: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          len: {
            args: [0, 255],
            msg: 'Address line 1 must be at most 255 characters.',
          },
        },
      },

      addressLine2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      city: {
        type: DataTypes.STRING(52),
        allowNull: true,
        validate: {
          len: {
            args: [0, 52],
            msg: 'City must be at most 52 characters.',
          },
        },
      },

      state: {
        type: DataTypes.STRING(2),
        allowNull: true,
        validate: {
          len: {
            args: [2, 2],
            msg: 'Please enter the abbreviated version of your state name.',
          },
        },
      },

      zipCode: {
        type: DataTypes.STRING(10),
        allowNull: true,
        validate: {
          isValidZip(value) {
            if (!value) return;
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (!zipRegex.test(value)) {
              throw new Error(
                'ZIP code must be a valid US ZIP (e.g., 12345 or 12345-6789).'
              );
            }
          },
        },
      },

      profilePic: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrlOrEmpty(value) {
            if (!value) return;
            if (!Validator.isURL(value)) {
              throw new Error(
                'Profile picture must be a valid URL.'
              );
            }
          },
        },
      },

      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: {
            args: [0, 2000],
            msg: 'Bio must be at most 2000 characters.',
          },
        },
      },

      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Password is required.' },
          len: {
            args: [50, 255],
            msg: 'Hashed password must be at least 50 characters long.',
          },
        },
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      stripCustomerId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      stripeSubscriptionId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      subscriptionStatus: {
        type: DataTypes.STRING, 
        allowNull: true,
        defaultValue: null
      },
    },
    {
      sequelize,
      modelName: 'Account',

      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'createdAt', 'updatedAt'],
        },
      },
      hooks: {
        beforeValidate(account) {
          if (account.email) {
            account.email = account.email.trim().toLowerCase();
          }
          if (account.username) {
            account.username = account.username.trim();
          }
          if (account.firstName) {
            account.firstName = account.firstName.trim();
          }
          if (account.lastName) {
            account.lastName = account.lastName.trim();
          }
        },
      },
    }
  );

  return Account;
};
