import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  company: [
    validator('presence', true),
    validator('belongs-to')
  ],

  transactionPaidOn : [
    validator('date'),
    validator('presence', true),
  ],

  paidByPerson : [
    validator('belongs-to')
  ],
  total : validator('number', {
    allowString: true,
    positive : true
  }),
});
export default DS.Model.extend(Validations, {
  company: DS.belongsTo('company',{inverse: 'paymentTransactions'}),
  laborTransaction: DS.belongsTo('labor-transaction',{inverse: 'paymentTransactions'}),
  purchaseTransaction: DS.belongsTo('purchase-transaction',{inverse: 'paymentTransactions'}),
  transactionPaidOn: DS.attr('date'),
  paidByPerson: DS.belongsTo('person',{inverse: 'paymentTransactions'}),
  paymentType: DS.belongsTo('payment-type',{inverse: 'paymentTransactions'}),
  total: DS.attr('number'),

  maximumAllowed: Ember.computed('purchaseTransaction.totalPaid', 'purchaseTransaction.total', function() {
    var totalLeftToPay = this.get('purchaseTransaction.totalLeftToPay')||0;
    return totalLeftToPay;
  }),
});
