'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'EstateSaleLeads',
      {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },

        requesterAccountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Accounts', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        estateSaleId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'EstateSales', key: 'id' },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },

        zipCode: {
          type: Sequelize.STRING(10),
          allowNull: false,
          references: { model: 'ZipCodes', key: 'zipCode' },
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },

        city: { type: Sequelize.STRING(52), allowNull: true },
        state: { type: Sequelize.STRING(2), allowNull: true },

        description: { type: Sequelize.TEXT, allowNull: true },
        desiredStartAt: { type: Sequelize.DATE, allowNull: true },

        status: { type: Sequelize.STRING(30), allowNull: false, defaultValue: 'open' },

        createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      },
      options
    );
  },

  async down(queryInterface) {
    options.tableName = 'EstateSaleLeads';
    await queryInterface.dropTable(options);
  },
};
