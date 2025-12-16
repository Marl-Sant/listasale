'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Cities',
      {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },

        name: { type: Sequelize.STRING(120), allowNull: false },
        state: { type: Sequelize.STRING(2), allowNull: true },
        country: { type: Sequelize.STRING(2), allowNull: true, defaultValue: 'US' },

        geonamesId: { type: Sequelize.INTEGER, allowNull: true },

        latitude: { type: Sequelize.FLOAT, allowNull: true },
        longitude: { type: Sequelize.FLOAT, allowNull: true },

        createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      },
      options
    );

    await queryInterface.addIndex('Cities', ['name', 'state', 'country'], {
      name: 'idx_cities_name_state_country',
      ...options
    });
  },

  async down(queryInterface) {
    options.tableName = 'Cities';
    await queryInterface.dropTable(options);
  },
};
