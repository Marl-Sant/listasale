'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EstateSale extends Model {
    static associate(models) {
      EstateSale.belongsTo(models.Account, { foreignKey: 'creatorAccountId', as: 'creator' });
      EstateSale.hasMany(models.EstateSaleImage, { foreignKey: 'estateSaleId', as: 'images' });
      EstateSale.hasMany(models.EstateSaleLead, { foreignKey: 'estateSaleId', as: 'leads' });
    }
  }

  EstateSale.init(
    {
      creatorAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: { msg: 'creatorAccountId must be an integer.' }, notNull: { msg: 'EstateSale must belong to an Account.' } },
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: { notEmpty: { msg: 'Title is required.' }, len: { args: [1, 200], msg: 'Title must be under 200 characters.' } },
      },
      description: { type: DataTypes.TEXT, allowNull: true },
      startAt: { type: DataTypes.DATE, allowNull: true },
      endAt: { type: DataTypes.DATE, allowNull: true },

      streetAddress: { type: DataTypes.STRING(255), allowNull: true },
      city: { type: DataTypes.STRING(52), allowNull: true },
      state: { type: DataTypes.STRING(2), allowNull: true },
      zipCode: { type: DataTypes.STRING(10), allowNull: true },

      latitude: { type: DataTypes.FLOAT, allowNull: true },
      longitude: { type: DataTypes.FLOAT, allowNull: true },

      showExactFrom: { type: DataTypes.DATE, allowNull: true },
      status: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'draft' },
      maxImagesAllowed: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 250 },
    },
    {
      sequelize,
      modelName: 'EstateSale',
      tableName: 'EstateSales',
      timestamps: true,
      hooks: {
        beforeValidate(sale) {
          if (sale.title) sale.title = sale.title.trim();
          if (sale.city) sale.city = sale.city.trim();
          if (sale.state) sale.state = sale.state.trim().toUpperCase();
          if (sale.zipCode) sale.zipCode = sale.zipCode.trim();
        },
      },
    }
  );

  return EstateSale;
};
