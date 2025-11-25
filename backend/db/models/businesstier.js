'use strict';

const { Model } = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class BusinessTier extends Model {
    static associate(models) {
      // One tier → many business profiles
      BusinessTier.hasMany(models.BusinessProfile, {
        foreignKey: 'tierId',
        as: 'businessProfiles',
      });
    }
  }

  BusinessTier.init(
    {
      // Machine-friendly code: 'TEMPORARY', 'GOLD', 'SILVER', 'BRONZE'
      code: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: {
          name: 'unique_business_tier_code',
          msg: 'Tier code must be unique.',
        },
        validate: {
          notEmpty: { msg: 'Tier code is required.' },
          len: {
            args: [2, 32],
            msg: 'Tier code must be between 2 and 32 characters.',
          },
          isUppercase(value) {
            if (!value) return;
            if (value !== value.toUpperCase()) {
              throw new Error('Tier code must be uppercase (e.g., TEMPORARY, GOLD).');
            }
          },
        },
      },

      // Human-facing label
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Tier name is required.' },
          len: {
            args: [2, 50],
            msg: 'Tier name must be between 2 and 50 characters.',
          },
        },
      },

      // Sort order for priority (lower = higher priority; TEMPORARY can be null or large number)
      sortOrder: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: { msg: 'sortOrder must be an integer.' },
          min: {
            args: [1],
            msg: 'sortOrder must be at least 1 if provided.',
          },
        },
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: {
            args: [0, 2000],
            msg: 'Description must be at most 2000 characters.',
          },
        },
      },

      // Convenience flag: true only for the TEMPORARY tier
      isTemporary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'BusinessTier',
      tableName: 'BusinessTiers',
      timestamps: true,

      defaultScope: {
        // Common use case: show tiers ordered by sortOrder ASC, then id
        order: [['sortOrder', 'ASC'], ['id', 'ASC']],
      },

      hooks: {
        beforeValidate(tier) {
          if (tier.code) tier.code = tier.code.trim().toUpperCase();
          if (tier.name) tier.name = tier.name.trim();
        },
      },
    }
  );

  return BusinessTier;
};
