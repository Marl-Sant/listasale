'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Payments',
      {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },

        accountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Accounts', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        provider: { type: Sequelize.STRING(30), allowNull: false, defaultValue: 'stripe' },
        providerPaymentId: { type: Sequelize.STRING(255), allowNull: true },

        amountCents: { type: Sequelize.INTEGER, allowNull: false },
        currency: { type: Sequelize.STRING(10), allowNull: false, defaultValue: 'USD' },

        status: { type: Sequelize.STRING(30), allowNull: false }, // pending/succeeded/failed/refunded

        rawProviderPayload: { type: Sequelize.JSON, allowNull: true },

        createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      },
      options
    );

    await queryInterface.addIndex('Payments', ['accountId'], { name: 'idx_payments_accountId', ...options });
    await queryInterface.addIndex('Payments', ['providerPaymentId'], { name: 'idx_payments_providerPaymentId', ...options });
  },

  async down(queryInterface) {
    options.tableName = 'Payments';
    await queryInterface.dropTable(options);
  },
};
