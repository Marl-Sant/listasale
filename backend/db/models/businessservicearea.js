'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BusinessServiceArea extends Model {
    static associate(models) {
      BusinessServiceArea.belongsTo(models.BusinessProfile, {
        foreignKey: 'businessId',
        as: 'businessProfile',
      });

      BusinessServiceArea.belongsTo(models.City, {
        foreignKey: 'cityId',
        as: 'city',
      });
    }
  }

  BusinessServiceArea.init(
    {
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: {
          isInt: { msg: 'businessId must be an integer.' },
          notNull: { msg: 'BusinessServiceArea must belong to a BusinessProfile.' },
        },
      },

      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: {
          isInt: { msg: 'cityId must be an integer.' },
          notNull: { msg: 'BusinessServiceArea must belong to a City.' },
        },
      },

      serviceRadiusKm: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: { msg: 'serviceRadiusKm must be a number.' },
          min: { args: [0], msg: 'serviceRadiusKm cannot be negative.' },
        },
      },
    },
    {
      sequelize,
      modelName: 'BusinessServiceArea',
      tableName: 'BusinessServiceAreas',
      timestamps: true,
      hooks: { beforeValidate() {} },
    }
  );

  return BusinessServiceArea;
};
