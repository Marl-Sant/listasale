'use strict';

const { City, ZipCode } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    const miami = await City.findOne({ where: { name: 'Miami', state: 'FL', country: 'US' } });
    const orlando = await City.findOne({ where: { name: 'Orlando', state: 'FL', country: 'US' } });
    const ftL = await City.findOne({ where: { name: 'Fort Lauderdale', state: 'FL', country: 'US' } });

    if (!miami || !orlando || !ftL) throw new Error('Seed prerequisite missing: Cities');

    const entries = [
      { zipCode: '33101', cityId: miami.id, latitude: 25.7751, longitude: -80.1947 },
      { zipCode: '32801', cityId: orlando.id, latitude: 28.5421, longitude: -81.3790 },
      { zipCode: '33301', cityId: ftL.id, latitude: 26.1192, longitude: -80.1436 },
      { zipCode: '33139', cityId: miami.id, latitude: 25.7907, longitude: -80.1300 },
    ];

    for (const z of entries) {
      await ZipCode.findOrCreate({
        where: { zipCode: z.zipCode },
        defaults: z
      });
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ZipCodes';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      options,
      { zipCode: { [Op.in]: ['33101', '32801', '33301', '33139'] } },
      {}
    );
  }
};
