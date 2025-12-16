'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EstateSaleImage extends Model {
    static associate(models) {
      EstateSaleImage.belongsTo(models.EstateSale, { foreignKey: 'estateSaleId', as: 'estateSale' });
    }
  }

  EstateSaleImage.init(
    {
      estateSaleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: { msg: 'estateSaleId must be an integer.' }, notNull: { msg: 'Image must belong to an EstateSale.' } },
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
      modelName: 'EstateSaleImage',
      tableName: 'EstateSaleImages',
      timestamps: true,
      hooks: { beforeValidate(img) { if (img.imageUrl) img.imageUrl = img.imageUrl.trim(); } },
    }
  );

  return EstateSaleImage;
};
