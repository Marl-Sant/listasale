'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'BusinessProfiles',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },

        accountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Accounts',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        companyName: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },

        website: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        mainPhone: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },

        city: {
          type: Sequelize.STRING(52),
          allowNull: true,
        },

        state: {
          type: Sequelize.STRING(2),
          allowNull: true,
        },

        zipCode: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },

        companyLogo: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        bio: {
          type: Sequelize.TEXT,
          allowNull: true,
        },


        tierId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'BusinessTiers',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },

        termsAndConditions: {
          type: Sequelize.STRING(500),
          allowNull: true,
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
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'BusinessProfiles';
    await queryInterface.dropTable(options);
  },
};
