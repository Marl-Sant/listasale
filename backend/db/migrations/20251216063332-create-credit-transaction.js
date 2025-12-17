'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'CreditTransactions',
      {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },

        accountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Accounts', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        creditTypeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'CreditTypes', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        delta: { type: Sequelize.INTEGER, allowNull: false },
        reason: { type: Sequelize.STRING(80), allowNull: false },

        relatedTable: { type: Sequelize.STRING(80), allowNull: true },
        relatedId: { type: Sequelize.INTEGER, allowNull: true },

        createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      },
      options
    );

    await queryInterface.addIndex({ tableName: 'CreditTransactions', schema: options.schema }, ['accountId'], { name: 'idx_credit_tx_accountId', ...options });
    await queryInterface.addIndex({ tableName: 'CreditTransactions', schema: options.schema }, ['creditTypeId'], { name: 'idx_credit_tx_creditTypeId', ...options });
  },

  async down(queryInterface) {
    options.tableName = 'CreditTransactions';
    await queryInterface.dropTable(options);
  },
};
