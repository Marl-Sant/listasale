'use strict';

const { Account, Payment } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    const account = await Account.findOne({ where: { email: 'demo@user.io' } });
    if (!account) throw new Error('Missing Account(demo@user.io)');

    await Payment.findOrCreate({
      where: { provider: 'stripe', providerPaymentId: 'pi_seed_123' },
      defaults: {
        accountId: account.id,
        provider: 'stripe',
        providerPaymentId: 'pi_seed_123',
        amountCents: 999,
        currency: 'USD',
        status: 'succeeded',
        rawProviderPayload: { seeded: true }
      }
    });
  },

  async down(queryInterface) {
    options.tableName = 'Payments';
    return queryInterface.bulkDelete(options, { providerPaymentId: 'pi_seed_123' }, {});
  }
};

