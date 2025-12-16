const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ZipCodeExclusive extends Model {
    static associate(models) {
      ZipCodeExclusive.belongsTo(models.ZipCode, { foreignKey: 'zipCode', as: 'zip' });
      ZipCodeExclusive.belongsTo(models.BusinessProfile, { foreignKey: 'ownerId', as: 'owner' });
    }
  }

  ZipCodeExclusive.init(
    {
      zipCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        validate: {
          isValidZip(value) {
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (!zipRegex.test(value)) throw new Error('zipCode must be a valid US ZIP.');
          },
        },
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'ownerId must be an integer.' },
          notNull: { msg: 'ZipCodeExclusive must belong to a BusinessProfile.' },
        },
      },
      revokedAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: 'ZipCodeExclusive',
      tableName: 'ZipCodesExclusive',
      timestamps: true,
      hooks: { beforeValidate(ex) { if (ex.zipCode) ex.zipCode = ex.zipCode.trim(); } },
    }
  );

  return ZipCodeExclusive;
};
