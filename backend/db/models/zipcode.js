'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ZipCode extends Model {
    static associate(models) {
      ZipCode.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
      ZipCode.hasOne(models.ZipCodeExclusive, { foreignKey: 'zipCode', as: 'exclusive' });
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
            if (!zipRegex.test(value)) throw new Error('ZIP code must be a valid US ZIP (e.g. 12345 or 12345-6789).');
          },
        },
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'cityId must be an integer.' },
          notNull: { msg: 'ZipCode must belong to a City.' },
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
