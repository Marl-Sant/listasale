'use strict';

const { BusinessProfile, EstateSaleLead, EstateSaleLeadNotification } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    const lead = await EstateSaleLead.findOne({ where: { zipCode: '33101', status: 'open' }, order: [['id', 'DESC']] });
    const business = await BusinessProfile.findOne({ where: { companyName: 'Sunshine Estate Solutions' } });

    if (!lead) throw new Error('Missing EstateSaleLead(open, 33101)');
    if (!business) throw new Error('Missing BusinessProfile(Sunshine Estate Solutions)');

    await EstateSaleLeadNotification.findOrCreate({
      where: { leadId: lead.id, businessId: business.id },
      defaults: {
        leadId: lead.id,
        businessId: business.id,
        isExclusive: true,
        tierAtSend: 'EXCLUSIVE',
        status: 'pending',
        sentAt: new Date(),
        respondedAt: null
      }
    });
  },

  async down(queryInterface) {
    options.tableName = 'EstateSaleLeadNotifications';
    return queryInterface.bulkDelete(options, null, {});
  }
};

