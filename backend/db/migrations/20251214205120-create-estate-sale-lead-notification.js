'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'EstateSaleLeadNotifications',
      {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },

        leadId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'EstateSaleLeads', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        businessId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'BusinessProfiles', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        isExclusive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        tierAtSend: { type: Sequelize.STRING(30), allowNull: true },

        status: { type: Sequelize.STRING(30), allowNull: false, defaultValue: 'pending' },

        sentAt: { type: Sequelize.DATE, allowNull: true },
        respondedAt: { type: Sequelize.DATE, allowNull: true },

        createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      },
      options
    );

    await queryInterface.addIndex({ tableName: 'EstateSaleLeadNotifications', schema: options.schema }, ['leadId'], { name: 'idx_lead_notifs_leadId', ...options });
    await queryInterface.addIndex({ tableName: 'EstateSaleLeadNotifications', schema: options.schema }, ['businessId'], { name: 'idx_lead_notifs_businessId', ...options });
  },

  async down(queryInterface) {
    options.tableName = 'EstateSaleLeadNotifications';
    await queryInterface.dropTable(options);
  },
};
