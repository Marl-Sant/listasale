'use strict';

const { Account, CreditType, CreditTransaction } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    const account = await Account.findOne({ where: { email: 'demo@user.io' } });
    const creditType = await CreditType.findOne({ where: { code: 'ESTATE' } });

    if (!account) throw new Error('Missing Account(demo@user.io)');
    if (!creditType) throw new Error('Missing CreditType(ESTATE)');

    // Use a stable uniqueness rule for seed idempotency:
    const where = {
      accountId: account.id,
      creditTypeId: creditType.id,
      delta: 10,
      reason: 'purchase'
    };

    await CreditTransaction.findOrCreate({
      where,
      defaults: { ...where, relatedTable: null, relatedId: null }
    });
  },

  async down(queryInterface) {
    options.tableName = 'CreditTransactions';
    return queryInterface.bulkDelete(options, { reason: 'purchase' }, {});
  }
};

