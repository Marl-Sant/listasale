'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ZipCode extends Model {
    static associate(models) {
      ZipCode.hasOne(models.ZipCodeExclusive, {
        foreignKey: 'zipCode',
        as: 'exclusive',
      });

      ZipCode.belongsToMany(models.City, {
        through: models.ZipCodeCity,
        foreignKey: 'zipCode',
        otherKey: 'cityId',
        as: 'cities',
      });

      ZipCode.hasMany(models.ZipCodeCity, {
        foreignKey: 'zipCode',
        as: 'zipCityLinks',
      });
    }
  }

  ZipCode.init(
    {
      zipCode: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
        validate: {
          isValidZip(value) {
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (!zipRegex.test(value))
              throw new Error(
                'ZIP code must be a valid US ZIP (e.g. 12345 or 12345-6789).'
              );
          },
        },
      },

      latitude: { type: DataTypes.FLOAT, allowNull: true },
      longitude: { type: DataTypes.FLOAT, allowNull: true },
    },
    {
      sequelize,
      modelName: 'ZipCode',
      tableName: 'ZipCodes',
      timestamps: true,
      hooks: {
        beforeValidate(zip) {
          if (zip.zipCode) zip.zipCode = zip.zipCode.trim();
        },
      },
    }
  );

  return ZipCode;
};
