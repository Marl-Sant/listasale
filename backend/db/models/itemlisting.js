'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemListing extends Model {
    static associate(models) {
      ItemListing.belongsTo(models.Account, { foreignKey: 'creatorAccountId', as: 'creator' });
      ItemListing.hasMany(models.ItemListingImage, { foreignKey: 'itemListingId', as: 'images' });
      ItemListing.hasMany(models.ItemListingInterest, { foreignKey: 'itemListingId', as: 'interests' });
    }
  }

  ItemListing.init(
    {
      creatorAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: { msg: 'creatorAccountId must be an integer.' }, notNull: { msg: 'ItemListing must belong to an Account.' } },
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: { notEmpty: { msg: 'Title is required.' }, len: { args: [1, 200], msg: 'Title must be under 200 characters.' } },
      },
      description: { type: DataTypes.TEXT, allowNull: true },

      priceCents: { type: DataTypes.INTEGER, allowNull: true, validate: { isInt: { msg: 'priceCents must be an integer.' } } },
      currency: { type: DataTypes.STRING(10), allowNull: true, defaultValue: 'USD' },

      condition: { type: DataTypes.STRING(40), allowNull: true },

      city: { type: DataTypes.STRING(52), allowNull: true },
      state: { type: DataTypes.STRING(2), allowNull: true },
      zipCode: { type: DataTypes.STRING(10), allowNull: true },

      status: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'active' },
      postedAt: { type: DataTypes.DATE, allowNull: true },
      refreshedAt: { type: DataTypes.DATE, allowNull: true },
      soldAt: { type: DataTypes.DATE, allowNull: true },

      autoRefreshEnabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'ItemListing',
      tableName: 'ItemListings',
      timestamps: true,
      hooks: {
        beforeValidate(item) {
          if (item.title) item.title = item.title.trim();
          if (item.city) item.city = item.city.trim();
          if (item.state) item.state = item.state.trim().toUpperCase();
          if (item.zipCode) item.zipCode = item.zipCode.trim();
          if (item.currency) item.currency = item.currency.trim().toUpperCase();
        },
      },
    }
  );

  return ItemListing;
};
