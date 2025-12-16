'use strict';

const { City } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    const cities = [
      { name: 'Miami', state: 'FL', country: 'US', geonamesId: 4164138, latitude: 25.7617, longitude: -80.1918 },
      { name: 'Fort Lauderdale', state: 'FL', country: 'US', geonamesId: 4155966, latitude: 26.1224, longitude: -80.1373 },
      { name: 'Orlando', state: 'FL', country: 'US', geonamesId: 4167147, latitude: 28.5383, longitude: -81.3792 },
      { name: 'Miami Beach', state: 'FL', country: 'US', geonamesId: 4164092, latitude: 25.7907, longitude: -80.1300 },
    ];

    for (const c of cities) {
      await City.findOrCreate({
        where: { name: c.name, state: c.state, country: c.country },
        defaults: c
      });
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Cities';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      options,
      {
        name: { [Op.in]: ['Miami', 'Fort Lauderdale', 'Orlando', 'Miami Beach'] },
        state: 'FL',
        country: 'US'
      },
      {}
    );
  }
};

