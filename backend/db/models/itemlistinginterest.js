'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemListingInterest extends Model {
    static associate(models) {
      ItemListingInterest.belongsTo(models.ItemListing, { foreignKey: 'itemListingId', as: 'itemListing' });
      ItemListingInterest.belongsTo(models.Account, { foreignKey: 'interestedAccountId', as: 'interestedAccount' });
    }
  }

  ItemListingInterest.init(
    {
      itemListingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: { msg: 'itemListingId must be an integer.' }, notNull: { msg: 'Interest must belong to an ItemListing.' } },
      },
      interestedAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: { msg: 'interestedAccountId must be an integer.' }, notNull: { msg: 'Interest must belong to an Account.' } },
      },
      message: { type: DataTypes.TEXT, allowNull: true },
      offerCents: { type: DataTypes.INTEGER, allowNull: true, validate: { isInt: { msg: 'offerCents must be an integer.' } } },
      buyoutRequested: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },

      buyerNameSnapshot: { type: DataTypes.STRING(120), allowNull: true },
      buyerEmailSnapshot: { type: DataTypes.STRING(255), allowNull: true },
      buyerPhoneSnapshot: { type: DataTypes.STRING(20), allowNull: true },
    },
    {
      sequelize,
      modelName: 'ItemListingInterest',
      tableName: 'ItemListingInterests',
      timestamps: true,
      hooks: {
        beforeValidate(i) {
          if (i.buyerEmailSnapshot) i.buyerEmailSnapshot = i.buyerEmailSnapshot.trim().toLowerCase();
          if (i.buyerNameSnapshot) i.buyerNameSnapshot = i.buyerNameSnapshot.trim();
        },
      },
    }
  );

  return ItemListingInterest;
};
