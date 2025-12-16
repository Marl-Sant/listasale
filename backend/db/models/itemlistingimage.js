'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemListingImage extends Model {
    static associate(models) {
      ItemListingImage.belongsTo(models.ItemListing, { foreignKey: 'itemListingId', as: 'itemListing' });
    }
  }

  ItemListingImage.init(
    {
      itemListingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: { msg: 'itemListingId must be an integer.' }, notNull: { msg: 'Image must belong to an ItemListing.' } },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'imageUrl is required.' },
          isUrl(value) {
            if (!Validator.isURL(value)) throw new Error('imageUrl must be a valid URL.');
          },
        },
      },
      storageKey: { type: DataTypes.STRING(255), allowNull: true },
      sortOrder: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0, validate: { isInt: { msg: 'sortOrder must be an integer.' } } },
    },
    {
      sequelize,
      modelName: 'ItemListingImage',
      tableName: 'ItemListingImages',
      timestamps: true,
      hooks: { beforeValidate(img) { if (img.imageUrl) img.imageUrl = img.imageUrl.trim(); } },
    }
  );

  return ItemListingImage;
};
