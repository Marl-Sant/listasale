'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CreditBalance extends Model {
    static associate(models) {
      CreditBalance.belongsTo(models.Account, { foreignKey: 'accountId', as: 'account' });
      CreditBalance.belongsTo(models.CreditType, { foreignKey: 'creditTypeId', as: 'creditType' });
    }
  }

  CreditBalance.init(
    {
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: {
          isInt: { msg: 'accountId must be an integer.' },
          notNull: { msg: 'CreditBalance must belong to an Account.' },
        },
      },
      creditTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: {
          isInt: { msg: 'creditTypeId must be an integer.' },
          notNull: { msg: 'CreditBalance must belong to a CreditType.' },
        },
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: { msg: 'balance must be an integer.' },
          min: { args: [0], msg: 'balance cannot be negative.' },
        },
      },
    },
    {
      sequelize,
      modelName: 'CreditBalance',
      tableName: 'CreditBalances',
      timestamps: true,
      hooks: { beforeValidate() {} },
    }
  );

  return CreditBalance;
};
