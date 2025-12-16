'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'ItemListingInterests',
      {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },

        itemListingId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'ItemListings', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        interestedAccountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Accounts', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        message: { type: Sequelize.TEXT, allowNull: true },
        offerCents: { type: Sequelize.INTEGER, allowNull: true },
        buyoutRequested: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },

        buyerNameSnapshot: { type: Sequelize.STRING(120), allowNull: true },
        buyerEmailSnapshot: { type: Sequelize.STRING(255), allowNull: true },
        buyerPhoneSnapshot: { type: Sequelize.STRING(20), allowNull: true },

        createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      },
      options
    );
  },

  async down(queryInterface) {
    options.tableName = 'ItemListingInterests';
    await queryInterface.dropTable(options);
  },
};
