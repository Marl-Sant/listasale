'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'ZipCodeCities',
      {
        zipCode: {
          type: Sequelize.STRING(10),
          allowNull: false,
          primaryKey: true,
          references: { model: 'ZipCodes', key: 'zipCode' },
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

        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      options
    );

    await queryInterface.addIndex(
      { tableName: 'ZipCodeCities', schema: options.schema },
      ['zipCode'],
      { name: 'idx_zipcodecities_zipCode' }
    );

    await queryInterface.addIndex(
      { tableName: 'ZipCodeCities', schema: options.schema },
      ['cityId'],
      { name: 'idx_zipcodecities_cityId' }
    );
  },

  async down(queryInterface) {
    options.tableName = 'ZipCodeCities';
    await queryInterface.dropTable(options);
  },
};
