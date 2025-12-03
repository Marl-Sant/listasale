'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'BusinessTiers';

    await queryInterface.createTable(
      'BusinessTiers',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },

        // MACHINE-FRIENDLY TIER CODE (REQUIRED + UNIQUE)
        code: {
          type: Sequelize.STRING(32),
          allowNull: false,
          unique: true
        },

        // HUMAN-FRIENDLY NAME
        name: {
          type: Sequelize.STRING(50),
          allowNull: false
        },

        // TIER PRIORITY (LOWER = HIGHER PRIORITY)
        sortOrder: {
          type: Sequelize.INTEGER,
          allowNull: true
        },

        // TIER DESCRIPTION
        description: {
          type: Sequelize.TEXT,
          allowNull: true
        },

        // FLAG FOR TEMPORARY TIER (true for TEMPORARY, false otherwise)
        isTemporary: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },

        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      },
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'BusinessTiers';
    return queryInterface.dropTable(options);
  }
};
