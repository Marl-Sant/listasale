'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      role: {
        type: Sequelize.ENUM('PERSONAL', 'BUSINESS'),
        allowNull: false,
        defaultValue: 'PERSONAL',
      },

      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },

      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },

      phoneNum: {
        type: Sequelize.STRING(12),
        allowNull: true,
      },

      addressLine1: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      addressLine2: {
        type: Sequelize.STRING(255),
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

      profilePic: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      hashedPassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      stripeCustomerId: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
      },
      stripeSubscriptionId: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      subscriptionStatus: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
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
    }, options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Accounts', options);

    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_accounts_role";');
    }
  },
};
