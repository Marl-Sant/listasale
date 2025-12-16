'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CreditType extends Model {
    static associate(models) {
      CreditType.hasMany(models.CreditBalance, { foreignKey: 'creditTypeId', as: 'balances' });
      CreditType.hasMany(models.CreditTransaction, { foreignKey: 'creditTypeId', as: 'transactions' });
    }
  }

  CreditType.init(
    {
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: { name: 'unique_credit_type_code', msg: 'Credit type code must be unique.' },
        validate: {
          notEmpty: { msg: 'Credit type code is required.' },
          len: { args: [2, 50], msg: 'Credit type code must be between 2 and 50 characters.' },
        },
      },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: 'CreditType',
      tableName: 'CreditTypes',
      timestamps: true,
      hooks: { beforeValidate(ct) { if (ct.code) ct.code = ct.code.trim().toUpperCase(); } },
    }
  );

  return CreditType;
};
