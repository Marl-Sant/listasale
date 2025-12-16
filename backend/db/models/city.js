'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.hasMany(models.ZipCode, { foreignKey: 'cityId', as: 'zipCodes' });
      City.hasMany(models.BusinessServiceArea, { foreignKey: 'cityId', as: 'serviceAreas' });
    }
  }

  City.init(
    {
      name: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'City name is required.' },
          len: { args: [1, 120], msg: 'City name must be between 1 and 120 characters.' },
        },
      },
      state: {
        type: DataTypes.STRING(2),
        allowNull: true,
        validate: { len: { args: [2, 2], msg: 'State must be a 2-letter code.' } },
      },
      country: {
        type: DataTypes.STRING(2),
        allowNull: true,
        defaultValue: 'US',
        validate: { len: { args: [2, 2], msg: 'Country must be a 2-letter code.' } },
      },
      geonamesId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { isInt: { msg: 'geonamesId must be an integer.' } },
      },
      latitude: { type: DataTypes.FLOAT, allowNull: true },
      longitude: { type: DataTypes.FLOAT, allowNull: true },
    },
    {
      sequelize,
      modelName: 'City',
      tableName: 'Cities',
      timestamps: true,
      hooks: {
        beforeValidate(city) {
          if (city.name) city.name = city.name.trim();
          if (city.state) city.state = city.state.trim().toUpperCase();
          if (city.country) city.country = city.country.trim().toUpperCase();
        },
      },
    }
  );

  return City;
};
