'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'BusinessServiceAreas',
      {
        businessId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: { model: 'BusinessProfiles', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        cityId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: { model: 'Cities', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        serviceRadiusKm: { type: Sequelize.FLOAT, allowNull: true },

        createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      },
      options
    );
  },

  async down(queryInterface) {
    options.tableName = 'BusinessServiceAreas';
    await queryInterface.dropTable(options);
  },
};
