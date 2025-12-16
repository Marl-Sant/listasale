'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CreditTransaction extends Model {
    static associate(models) {
      CreditTransaction.belongsTo(models.Account, { foreignKey: 'accountId', as: 'account' });
      CreditTransaction.belongsTo(models.CreditType, { foreignKey: 'creditTypeId', as: 'creditType' });
    }
  }

  CreditTransaction.init(
    {
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'accountId must be an integer.' },
          notNull: { msg: 'CreditTransaction must belong to an Account.' },
        },
      },
      creditTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'creditTypeId must be an integer.' },
          notNull: { msg: 'CreditTransaction must belong to a CreditType.' },
        },
      },
      delta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: { msg: 'delta must be an integer.' } },
      },
      reason: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: { notEmpty: { msg: 'reason is required.' }, len: { args: [2, 80], msg: 'reason must be under 80 characters.' } },
      },
      relatedTable: { type: DataTypes.STRING(80), allowNull: true },
      relatedId: { type: DataTypes.INTEGER, allowNull: true, validate: { isInt: { msg: 'relatedId must be an integer.' } } },
    },
    {
      sequelize,
      modelName: 'CreditTransaction',
      tableName: 'CreditTransactions',
      timestamps: true,
      hooks: { beforeValidate(tx) { if (tx.reason) tx.reason = tx.reason.trim(); } },
    }
  );

  return CreditTransaction;
};
