import DS from 'ember-data';

export default DS.Model.extend({
  company: DS.belongsTo('company',{inverse: 'paymentTransactions'}),
  laborTransaction: DS.belongsTo('labor-transaction',{inverse: 'paymentTransactions'}),
  purchaseTransaction: DS.belongsTo('purchase-transaction',{inverse: 'paymentTransactions'}),
  transactionPaidOn: DS.attr('date'),
  paidByPerson: DS.belongsTo('person',{inverse: 'paymentTransactions'}),
  paymentType: DS.belongsTo('payment-type',{inverse: 'paymentTransactions'}),
  total: DS.attr('number'),
});
