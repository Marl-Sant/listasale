'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'BusinessTiers';

    return queryInterface.bulkInsert(
      options,
      [
        {
          code: 'TEMPORARY',
          name: 'Temporary',
          sortOrder: 999, // Always last
          description:
            'Default tier for new business accounts. Limited functionality until an official tier is selected.',
          isTemporary: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          code: 'GOLD',
          name: 'Gold',
          sortOrder: 1,
          description:
            'Top-level membership with highest priority for lead distribution, expanded service areas, and premium tools.',
          isTemporary: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          code: 'SILVER',
          name: 'Silver',
          sortOrder: 2,
          description:
            'Mid-tier membership with balanced access to leads, service area limits, and core business tools.',
          isTemporary: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          code: 'BRONZE',
          name: 'Bronze',
          sortOrder: 3,
          description:
            'Entry-level business tier offering basic access to lead distribution and limited service areas.',
          isTemporary: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'BusinessTiers';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      options,
      {
        code: { [Op.in]: ['TEMPORARY', 'GOLD', 'SILVER', 'BRONZE'] }
      },
      {}
    );
  }
};
