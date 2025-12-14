'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'BusinessProfiles';

    return queryInterface.bulkInsert(
      options,
      [
        {
          accountId: 2,
          companyName: 'Sunshine Estate Solutions',
          website: 'https://www.sunshineestatesolutions.com',
          mainPhone: '5615551234',
          city: 'Palm Beach Gardens',
          state: 'FL',
          zipCode: '33410',
          companyLogo: 'https://example.com/logos/sunshine.png',
          bio: 'We specialize in luxury estate sales throughout Palm Beach County. Providing high-quality evaluations, staging, and fast turnaround.',
          tierId: 1,
          termsAndConditions: 'v1-2025',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          accountId: 3,
          companyName: 'Treasure Hunters Estate Services',
          website: 'https://www.treasurehuntersfl.com',
          mainPhone: '3055559001',
          city: 'Miami Shores',
          state: 'FL',
          zipCode: '33138',
          companyLogo: 'https://example.com/logos/treasurehunters.png',
          bio: 'Family-owned company helping South Florida residents downsize and liquidate estate assets with care and integrity.',
          tierId: 2,
          termsAndConditions: 'v1-2025',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'BusinessProfiles';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      options,
      {
        accountId: { [Op.in]: [1, 2, 3] }
      },
      {}
    );
  }
};
