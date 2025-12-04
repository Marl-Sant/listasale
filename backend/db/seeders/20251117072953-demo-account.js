'use strict';

const { Account } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Account.bulkCreate([
      {
        role: 'PERSONAL',
        firstName: 'Demo',
        lastName: 'User',
        username: 'demoUser',
        email: 'demo@user.io',
        phoneNum: '555-111-2222',
        addressLine1: '123 Main St',
        addressLine2: null,
        city: 'Miami',
        state: 'FL',
        zipCode: '33101',
        profilePic: 'https://example.com/demo.jpg',
        bio: 'This is a demo user account for testing.',
        hashedPassword: bcrypt.hashSync('password123'),
        isActive: true,
      },
      {
        role: 'BUSINESS',
        firstName: 'Sarah',
        lastName: 'EstatePro',
        username: 'estatepro_sarah',
        email: 'sarah@estatepro.com',
        phoneNum: '555-444-9999',
        addressLine1: '742 Evergreen Terrace',
        addressLine2: null,
        city: 'Orlando',
        state: 'FL',
        zipCode: '32801',
        profilePic: 'https://example.com/sarah.jpg',
        bio: 'Professional estate sale manager with 10+ years experience.',
        hashedPassword: bcrypt.hashSync('password123'),
        isActive: true,
      },
      {
        role: 'BUSINESS',
        firstName: 'Michael',
        lastName: 'Buyer',
        username: 'mikeBuyer',
        email: 'michael@buyer.com',
        phoneNum: '555-222-8888',
        addressLine1: '500 Ocean Dr',
        addressLine2: 'Apt 1203',
        city: 'Miami Beach',
        state: 'FL',
        zipCode: '33139',
        profilePic: 'https://example.com/mike.jpg',
        bio: 'I love finding deals at estate sales.',
        hashedPassword: bcrypt.hashSync('password123'),
        isActive: true,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Accounts';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: ['demoUser', 'estatepro_sarah', 'mikeBuyer']
        }
      },
      {}
    );
  }
};
