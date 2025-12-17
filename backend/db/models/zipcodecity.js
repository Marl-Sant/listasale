'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ZipCodeCity extends Model {
    static associate(models) {
      ZipCodeCity.belongsTo(models.ZipCode, {
        foreignKey: 'zipCode',
        targetKey: 'zipCode',
        as: 'zip'
      });

      ZipCodeCity.belongsTo(models.City, {
        foreignKey: 'cityId',
        as: 'city'
      });
    }
  }

  ZipCodeCity.init(
    {
      zipCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        validate: {
          notEmpty: { msg: 'zipCode is required.' },
          isValidZip(value) {
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (!zipRegex.test(value)) {
              throw new Error(
                'ZIP code must be a valid US ZIP (e.g., 12345 or 12345-6789).'
              );
            }
          },
        },
      },

      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: {
          isInt: { msg: 'cityId must be an integer.' },
          notNull: { msg: 'ZipCodeCity must belong to a City.' },
        },
      },
    },
    {
      sequelize,
      modelName: 'ZipCodeCity',
      tableName: 'ZipCodeCities',
      timestamps: true,
      hooks: {
        beforeValidate(row) {
          if (row.zipCode) row.zipCode = row.zipCode.trim();
        },
      },
    }
  );

  return ZipCodeCity;
};
