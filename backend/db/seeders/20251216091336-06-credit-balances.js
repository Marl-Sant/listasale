'use strict';

const { Account, CreditType, CreditBalance } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up() {
    const account = await Account.findOne({ where: { email: 'demo@user.io' } });
    const creditType = await CreditType.findOne({ where: { code: 'ESTATE' } });

    if (!account) throw new Error('Missing Account(demo@user.io)');
    if (!creditType) throw new Error('Missing CreditType(ESTATE)');

    await CreditBalance.findOrCreate({
      where: { accountId: account.id, creditTypeId: creditType.id },
      defaults: { accountId: account.id, creditTypeId: creditType.id, balance: 10 }
    });
  },

  async down(queryInterface) {
    options.tableName = 'CreditBalances';
    return queryInterface.bulkDelete(options, null, {});
  }
};
