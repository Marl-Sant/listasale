'use strict';

const { Account, ItemListing } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    const creator = await Account.findOne({ where: { email: 'demo@user.io' } });
    if (!creator) throw new Error('Missing Account(demo@user.io)');

    await ItemListing.findOrCreate({
      where: { creatorAccountId: creator.id, title: 'Vintage Lamp' },
      defaults: {
        creatorAccountId: creator.id,
        title: 'Vintage Lamp',
        description: 'Brass base, great condition.',
        priceCents: 4500,
        currency: 'USD',
        condition: 'used_good',
        city: 'Miami',
        state: 'FL',
        zipCode: '33101',
        status: 'active',
        postedAt: new Date(),
        refreshedAt: new Date(),
        soldAt: null,
        autoRefreshEnabled: false
      }
    });
  },

  async down(queryInterface) {
    options.tableName = 'ItemListings';
    return queryInterface.bulkDelete(options, { title: 'Vintage Lamp' }, {});
  }
};

