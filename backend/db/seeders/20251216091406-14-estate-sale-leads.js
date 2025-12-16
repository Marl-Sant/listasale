'use strict';

const { Account, EstateSaleLead } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    const requester = await Account.findOne({ where: { email: 'demo@user.io' } });
    if (!requester) throw new Error('Missing Account(demo@user.io)');

    await EstateSaleLead.findOrCreate({
      where: { requesterAccountId: requester.id, zipCode: '33101', status: 'open' },
      defaults: {
        requesterAccountId: requester.id,
        estateSaleId: null,
        zipCode: '33101',
        city: 'Miami',
        state: 'FL',
        description: 'Need help running a 2-day estate sale.',
        desiredStartAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'open'
      }
    });
  },

  async down(queryInterface) {
    options.tableName = 'EstateSaleLeads';
    return queryInterface.bulkDelete(options, { zipCode: '33101', status: 'open' }, {});
  }
};

