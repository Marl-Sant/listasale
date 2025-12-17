'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'EstateSaleImages',
      {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },

        estateSaleId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'EstateSales', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        imageUrl: { type: Sequelize.STRING, allowNull: false },
        storageKey: { type: Sequelize.STRING(255), allowNull: true },
        sortOrder: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },

        createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      },
      options
    );

    await queryInterface.addIndex({ tableName: 'EstateSaleImages', schema: options.schema }, ['estateSaleId'], { name: 'idx_estate_sale_images_sale', ...options });
  },

  async down(queryInterface) {
    options.tableName = 'EstateSaleImages';
    await queryInterface.dropTable(options);
  },
};
