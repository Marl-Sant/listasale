'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Account, { foreignKey: 'accountId', as: 'account' });
    }
  }

  Payment.init(
    {
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'accountId must be an integer.' },
          notNull: { msg: 'Payment must belong to an Account.' },
        },
      },
      provider: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'stripe',
        validate: { notEmpty: { msg: 'provider is required.' } },
      },
      providerPaymentId: { type: DataTypes.STRING(255), allowNull: true },

      amountCents: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: { msg: 'amountCents must be an integer.' }, min: { args: [0], msg: 'amountCents cannot be negative.' } },
      },
      currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'USD',
        validate: { notEmpty: { msg: 'currency is required.' } },
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: { notEmpty: { msg: 'status is required.' } },
      },
      rawProviderPayload: { type: DataTypes.JSON, allowNull: true },
    },
    {
      sequelize,
      modelName: 'Payment',
      tableName: 'Payments',
      timestamps: true,
      hooks: { beforeValidate(p) { if (p.currency) p.currency = p.currency.trim().toUpperCase(); if (p.status) p.status = p.status.trim(); } },
    }
  );

  return Payment;
};
