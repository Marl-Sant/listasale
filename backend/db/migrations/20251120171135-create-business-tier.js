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

        code: {
          type: Sequelize.STRING(32),
          allowNull: false,
          unique: true
        },

        name: {
          type: Sequelize.STRING(50),
          allowNull: false
        },

        sortOrder: {
          type: Sequelize.INTEGER,
          allowNull: true
        },

        description: {
          type: Sequelize.TEXT,
          allowNull: true
        },

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
