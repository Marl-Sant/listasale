'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EstateSaleLeadNotification extends Model {
    static associate(models) {
      EstateSaleLeadNotification.belongsTo(models.EstateSaleLead, { foreignKey: 'leadId', as: 'lead' });
      EstateSaleLeadNotification.belongsTo(models.BusinessProfile, { foreignKey: 'businessId', as: 'businessProfile' });
    }
  }

  EstateSaleLeadNotification.init(
    {
      leadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: { msg: 'leadId must be an integer.' }, notNull: { msg: 'Notification must belong to a lead.' } },
      },
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: { msg: 'businessId must be an integer.' }, notNull: { msg: 'Notification must belong to a BusinessProfile.' } },
      },

      isExclusive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      tierAtSend: { type: DataTypes.STRING(30), allowNull: true },

      status: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'pending' },

      sentAt: { type: DataTypes.DATE, allowNull: true },
      respondedAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: 'EstateSaleLeadNotification',
      tableName: 'EstateSaleLeadNotifications',
      timestamps: true,
      hooks: { beforeValidate(n) { if (n.status) n.status = n.status.trim(); } },
    }
  );

  return EstateSaleLeadNotification;
};
