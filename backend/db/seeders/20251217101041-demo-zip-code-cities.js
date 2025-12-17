'use strict';

const { City, ZipCode, ZipCodeCity } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    const miami = await City.findOne({ where: { name: 'Miami', state: 'FL' } });
    const miamiBeach = await City.findOne({ where: { name: 'Miami Beach', state: 'FL' } });
    const orlando = await City.findOne({ where: { name: 'Orlando', state: 'FL' } });

    const z33101 = await ZipCode.findByPk('33101');
    const z33139 = await ZipCode.findByPk('33139');
    const z32801 = await ZipCode.findByPk('32801');

    await ZipCodeCity.bulkCreate(
      [
        // 33101 can map to Miami (and optionally multiple cities)
        { zipCode: z33101.zipCode, cityId: miami.id },

        // 33139 can map to Miami Beach AND Miami (example of multi-city)
        { zipCode: z33139.zipCode, cityId: miamiBeach.id },
        { zipCode: z33139.zipCode, cityId: miami.id },

        // 32801 -> Orlando
        { zipCode: z32801.zipCode, cityId: orlando.id },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ZipCodeCities';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      options,
      {
        zipCode: { [Op.in]: ['33101', '33139', '32801'] },
      },
      {}
    );
  },
};
