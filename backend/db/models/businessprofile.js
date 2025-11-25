'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BusinessProfile extends Model {
    static associate(models) {
      // One-to-one with Account
      BusinessProfile.belongsTo(models.Account, {
        foreignKey: 'accountId',
        as: 'account',
      });

      // Business tier (Gold, Silver, Bronze, Temporary)
      BusinessProfile.belongsTo(models.BusinessTier, {
        foreignKey: 'tierId',
        as: 'tier'
      });

      // Service areas (many-to-many)
      // BusinessProfile.belongsToMany(models.City, {
      //   through: models.BusinessServiceArea,
      //   foreignKey: 'businessId',
      //   otherKey: 'cityId',
      //   as: 'serviceAreas'
      // });

      // Exclusive ZIP code ownership
      // BusinessProfile.hasMany(models.ZipCodeExclusive, {
      //   foreignKey: 'ownerId',
      //   as: 'exclusiveZipCodes'
      // });

      // Example future associations:
      // BusinessProfile.hasMany(models.EstateSale, { foreignKey: 'businessId' });
      // BusinessProfile.hasMany(models.LeadAssignment, { foreignKey: 'businessId' });
    }
  }

  BusinessProfile.init(
    {
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'accountId must be an integer.' },
          notNull: {
            msg: 'BusinessProfile must belong to an Account.',
          },
        },
      },

      companyName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Company name is required.' },
          len: {
            args: [2, 100],
            msg: 'Company name must be between 2 and 100 characters.',
          },
        },
      },

      website: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isValidWebsite(value) {
            if (!value) return;
            if (
              !Validator.isURL(value, {
                protocols: ['http', 'https'],
                require_protocol: true,
              })
            ) {
              throw new Error(
                'Website must be a valid URL with http/https.'
              );
            }
          },
        },
      },

      mainPhone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
          isValidPhone(value) {
            if (!value) return;
            const cleaned = value.replace(/[^\d+]/g, '');
            if (cleaned.length < 7) {
              throw new Error(
                'Main phone number appears too short.'
              );
            }
          },
        },
      },

      city: {
        type: DataTypes.STRING(52),
        allowNull: true,
        validate: {
          len: {
            args: [0, 52],
            msg: 'City must be under 52 characters.',
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
          isZip(value) {
            if (!value) return;
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (!zipRegex.test(value)) {
              throw new Error(
                'ZIP code must be a valid US ZIP (e.g. 12345 or 12345-6789).'
              );
            }
          },
        },
      },

      companyLogo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrlOrEmpty(value) {
            if (!value) return;
            if (!Validator.isURL(value)) {
              throw new Error(
                'Company logo must be a valid URL.'
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

      tierId: {
        type: DataTypes.INTEGER,
        allowNull: true, // auto-assigned if null
        validate: {
          isInt: { msg: 'tierId must be an integer.' },
        },
      },

      termsAndConditions: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
          len: {
            args: [0, 500],
            msg: 'Terms and conditions reference must be under 500 characters.',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'BusinessProfile',
      tableName: 'BusinessProfiles',
      timestamps: true,

      hooks: {
        // Normalize input
        beforeValidate(business) {
          if (business.companyName)
            business.companyName = business.companyName.trim();
          if (business.website)
            business.website = business.website.trim();
          if (business.city)
            business.city = business.city.trim();
          if (business.state)
            business.state = business.state.trim().toUpperCase();
          if (business.zipCode)
            business.zipCode = business.zipCode.trim();
        },

        // Auto-assign Temporary tier if tierId missing
        async beforeCreate(business, options) {
          if (!business.tierId) {
            const { BusinessTier } = sequelize.models;
            const tempTier = await BusinessTier.findOne({
              where: { code: 'TEMPORARY' },
            });

            if (!tempTier) {
              throw new Error(
                'TEMPORARY business tier not found. Make sure BusinessTier seeds were run.'
              );
            }

            business.tierId = tempTier.id;
          }
        },
      },
    }
  );

  return BusinessProfile;
};
