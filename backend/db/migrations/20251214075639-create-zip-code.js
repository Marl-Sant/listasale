'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'ZipCodes',
      {
        zipCode: { allowNull: false, primaryKey: true, type: Sequelize.STRING(10) },

        cityId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Cities', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        latitude: { type: Sequelize.FLOAT, allowNull: true },
        longitude: { type: Sequelize.FLOAT, allowNull: true },

        createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      },
      options
    );

    await queryInterface.addIndex('ZipCodes', ['cityId'], { name: 'idx_zipcodes_cityId', ...options });
  },

  async down(queryInterface) {
    options.tableName = 'ZipCodes';
    await queryInterface.dropTable(options);
  },
};
