import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import Ember from 'ember';

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
  paycheck: DS.belongsTo('paycheck',{inverse: 'paymentTransactions'}),
  purchaseBill: DS.belongsTo('purchase-bill',{inverse: 'paymentTransactions'}),
  transactionPaidOn: DS.attr('date'),
  paidByPerson: DS.belongsTo('person',{inverse: 'paymentTransactions'}),
  paymentType: DS.belongsTo('payment-type',{inverse: 'paymentTransactions'}),
  total: DS.attr('number'),

  maximumAllowed: Ember.computed('purchaseBill.totalPaid', 'purchaseBill.total', function() {
    var totalLeftToPay = this.get('purchaseBill.totalLeftToPay')||0;
    return totalLeftToPay;
  }),
});
