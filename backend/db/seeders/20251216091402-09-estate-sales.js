'use strict';

const { Account, ZipCode, EstateSale } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    const creator = await Account.findOne({ where: { email: 'demo@user.io' } });
    const zip = await ZipCode.findOne({ where: { zipCode: '33101' } });

    if (!creator) throw new Error('Missing Account(demo@user.io)');
    if (!zip) throw new Error('Missing ZipCode(33101)');

    await EstateSale.findOrCreate({
      where: { creatorAccountId: creator.id, title: 'Palm Beach Estate Sale' },
      defaults: {
        creatorAccountId: creator.id,
        title: 'Palm Beach Estate Sale',
        description: 'High-end furniture, art, and collectibles.',
        startAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        endAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
        streetAddress: '123 Ocean Dr',
        city: 'Miami',
        state: 'FL',
        zipCode: zip.zipCode,
        latitude: 25.7751,
        longitude: -80.1947,
        showExactFrom: new Date(Date.now() + 12 * 60 * 60 * 1000),
        status: 'published',
        maxImagesAllowed: 250
      }
    });
  },

  async down(queryInterface) {
    options.tableName = 'EstateSales';
    return queryInterface.bulkDelete(options, { title: 'Palm Beach Estate Sale' }, {});
  }
};

