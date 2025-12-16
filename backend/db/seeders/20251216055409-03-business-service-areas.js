'use strict';

const { City, BusinessProfile, BusinessServiceArea } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    const business = await BusinessProfile.findOne({ where: { companyName: 'Sunshine Estate Solutions' } });
    const miami = await City.findOne({ where: { name: 'Miami', state: 'FL', country: 'US' } });

    if (!business) throw new Error('Missing BusinessProfile(companyName="Sunshine Estate Solutions")');
    if (!miami) throw new Error('Missing City(Miami, FL, US)');

    await BusinessServiceArea.findOrCreate({
      where: { businessId: business.id, cityId: miami.id },
      defaults: { businessId: business.id, cityId: miami.id, serviceRadiusKm: 30 }
    });
  },

  async down(queryInterface) {
    options.tableName = 'BusinessServiceAreas';
    return queryInterface.bulkDelete(options, null, {});
  }
};

