'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EstateSaleLead extends Model {
    static associate(models) {
      EstateSaleLead.belongsTo(models.Account, { foreignKey: 'requesterAccountId', as: 'requester' });
      EstateSaleLead.belongsTo(models.EstateSale, { foreignKey: 'estateSaleId', as: 'estateSale' });
      EstateSaleLead.hasMany(models.EstateSaleLeadNotification, { foreignKey: 'leadId', as: 'notifications' });
    }
  }

  EstateSaleLead.init(
    {
      requesterAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: { msg: 'requesterAccountId must be an integer.' }, notNull: { msg: 'Lead must belong to an Account.' } },
      },
      estateSaleId: { type: DataTypes.INTEGER, allowNull: true, validate: { isInt: { msg: 'estateSaleId must be an integer.' } } },

      zipCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'zipCode is required.' },
          isValidZip(value) {
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (!zipRegex.test(value)) throw new Error('zipCode must be a valid US ZIP.');
          },
        },
      },

      city: { type: DataTypes.STRING(52), allowNull: true },
      state: { type: DataTypes.STRING(2), allowNull: true },

      description: { type: DataTypes.TEXT, allowNull: true },
      desiredStartAt: { type: DataTypes.DATE, allowNull: true },

      status: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'open' },
    },
    {
      sequelize,
      modelName: 'EstateSaleLead',
      tableName: 'EstateSaleLeads',
      timestamps: true,
      hooks: {
        beforeValidate(lead) {
          if (lead.city) lead.city = lead.city.trim();
          if (lead.state) lead.state = lead.state.trim().toUpperCase();
          if (lead.zipCode) lead.zipCode = lead.zipCode.trim();
        },
      },
    }
  );

  return EstateSaleLead;
};
