'use strict';

const { Account, ItemListing, ItemListingInterest } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    const listing = await ItemListing.findOne({ where: { title: 'Vintage Lamp' } });
    const interested = await Account.findOne({ where: { email: 'michael@buyer.com' } });

    if (!listing) throw new Error('Missing ItemListing(Vintage Lamp)');
    if (!interested) throw new Error('Missing Account(michael@buyer.com)');

    await ItemListingInterest.findOrCreate({
      where: { itemListingId: listing.id, interestedAccountId: interested.id },
      defaults: {
        itemListingId: listing.id,
        interestedAccountId: interested.id,
        message: 'Interested—can I see it today?',
        offerCents: 4000,
        buyoutRequested: false,
        buyerNameSnapshot: `${interested.firstName} ${interested.lastName}`,
        buyerEmailSnapshot: interested.email,
        buyerPhoneSnapshot: interested.phoneNum
      }
    });
  },

  async down(queryInterface) {
    options.tableName = 'ItemListingInterests';
    return queryInterface.bulkDelete(options, { buyerEmailSnapshot: 'michael@buyer.com' }, {});
  }
};

