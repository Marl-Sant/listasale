'use strict';

const { EstateSale, EstateSaleImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    const sale = await EstateSale.findOne({ where: { title: 'Palm Beach Estate Sale' } });
    if (!sale) throw new Error('Missing EstateSale(Palm Beach Estate Sale)');

    await EstateSaleImage.findOrCreate({
      where: { storageKey: 'estate/seed/1.jpg' },
      defaults: {
        estateSaleId: sale.id,
        imageUrl: 'https://example.com/estate/seed-1.jpg',
        storageKey: 'estate/seed/1.jpg',
        sortOrder: 1
      }
    });
  },

  async down(queryInterface) {
    options.tableName = 'EstateSaleImages';
    return queryInterface.bulkDelete(options, { storageKey: 'estate/seed/1.jpg' }, {});
  }
};
