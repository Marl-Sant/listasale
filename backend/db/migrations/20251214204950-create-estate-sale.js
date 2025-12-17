'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'EstateSales',
      {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },

        creatorAccountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Accounts', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        title: { type: Sequelize.STRING(200), allowNull: false },
        description: { type: Sequelize.TEXT, allowNull: true },

        startAt: { type: Sequelize.DATE, allowNull: true },
        endAt: { type: Sequelize.DATE, allowNull: true },

        streetAddress: { type: Sequelize.STRING(255), allowNull: true },
        city: { type: Sequelize.STRING(52), allowNull: true },
        state: { type: Sequelize.STRING(2), allowNull: true },

        zipCode: {
          type: Sequelize.STRING(10),
          allowNull: true,
          references: { model: 'ZipCodes', key: 'zipCode' },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },

        latitude: { type: Sequelize.FLOAT, allowNull: true },
        longitude: { type: Sequelize.FLOAT, allowNull: true },

        showExactFrom: { type: Sequelize.DATE, allowNull: true },

        status: { type: Sequelize.STRING(30), allowNull: false, defaultValue: 'draft' },
        maxImagesAllowed: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 250 },

        createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      },
      options
    );

    await queryInterface.addIndex({ tableName: 'EstateSales', schema: options.schema }, ['creatorAccountId'], { name: 'idx_estate_sales_creator', ...options });
    await queryInterface.addIndex({ tableName: 'EstateSales', schema: options.schema }, ['zipCode'], { name: 'idx_estate_sales_zip', ...options });
  },

  async down(queryInterface) {
    options.tableName = 'EstateSales';
    await queryInterface.dropTable(options);
  },
};
