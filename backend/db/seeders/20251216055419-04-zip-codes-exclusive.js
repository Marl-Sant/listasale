'use strict';

const { ZipCode, BusinessProfile, ZipCodeExclusive } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    const owner = await BusinessProfile.findOne({ where: { companyName: 'Sunshine Estate Solutions' } });
    const zip = await ZipCode.findOne({ where: { zipCode: '33101' } });

    if (!owner) throw new Error('Missing BusinessProfile(Sunshine Estate Solutions)');
    if (!zip) throw new Error('Missing ZipCode(33101)');

    await ZipCodeExclusive.findOrCreate({
      where: { zipCode: zip.zipCode },
      defaults: {
        zipCode: zip.zipCode,
        ownerId: owner.id,
        revokedAt: null
      }
    });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ZipCodesExclusive';
    return queryInterface.bulkDelete(options, { zipCode: '33101' }, {});
  }
};
