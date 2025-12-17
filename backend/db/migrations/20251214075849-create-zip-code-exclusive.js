'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'ZipCodesExclusive',
      {
        zipCode: {
          type: Sequelize.STRING(10),
          allowNull: false,
          primaryKey: true,
          references: { model: 'ZipCodes', key: 'zipCode' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        ownerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'BusinessProfiles', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        revokedAt: { type: Sequelize.DATE, allowNull: true },

        createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      },
      options
    );

    await queryInterface.addIndex(
      { tableName: 'ZipCodesExclusive', schema: options.schema },
      ['ownerId'], 
      { name: 'idx_zip_exclusive_ownerId', 
      ...options });
  },

  async down(queryInterface) {
    options.tableName = 'ZipCodesExclusive';
    await queryInterface.dropTable(options);
  },
};
