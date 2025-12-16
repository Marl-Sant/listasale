'use strict';

const { CreditType } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    await CreditType.findOrCreate({
      where: { code: 'ESTATE' },
      defaults: { code: 'ESTATE', description: 'Credits for estate sale listings' }
    });
  },

  async down(queryInterface) {
    options.tableName = 'CreditTypes';
    return queryInterface.bulkDelete(options, { code: 'ESTATE' }, {});
  }
};

