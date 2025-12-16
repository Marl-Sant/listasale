'use strict';

const { ItemListing, ItemListingImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    const listing = await ItemListing.findOne({ where: { title: 'Vintage Lamp' } });
    if (!listing) throw new Error('Missing ItemListing(Vintage Lamp)');

    await ItemListingImage.findOrCreate({
      where: { storageKey: 'items/seed/1.jpg' },
      defaults: {
        itemListingId: listing.id,
        imageUrl: 'https://example.com/items/seed-1.jpg',
        storageKey: 'items/seed/1.jpg',
        sortOrder: 1
      }
    });
  },

  async down(queryInterface) {
    options.tableName = 'ItemListingImages';
    return queryInterface.bulkDelete(options, { storageKey: 'items/seed/1.jpg' }, {});
  }
};

