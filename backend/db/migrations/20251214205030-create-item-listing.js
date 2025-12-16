'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'ItemListings',
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

        priceCents: { type: Sequelize.INTEGER, allowNull: true },
        currency: { type: Sequelize.STRING(10), allowNull: true, defaultValue: 'USD' },

        condition: { type: Sequelize.STRING(40), allowNull: true },

        city: { type: Sequelize.STRING(52), allowNull: true },
        state: { type: Sequelize.STRING(2), allowNull: true },
        zipCode: { type: Sequelize.STRING(10), allowNull: true },

        status: { type: Sequelize.STRING(30), allowNull: false, defaultValue: 'active' },
        postedAt: { type: Sequelize.DATE, allowNull: true },
        refreshedAt: { type: Sequelize.DATE, allowNull: true },
        soldAt: { type: Sequelize.DATE, allowNull: true },

        autoRefreshEnabled: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },

        createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      },
      options
    );

    await queryInterface.addIndex('ItemListings', ['creatorAccountId'], { name: 'idx_item_listings_creator', ...options });
    await queryInterface.addIndex('ItemListings', ['status'], { name: 'idx_item_listings_status', ...options });
  },

  async down(queryInterface) {
    options.tableName = 'ItemListings';
    await queryInterface.dropTable(options);
  },
};
