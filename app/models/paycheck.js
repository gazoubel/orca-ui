import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import Ember from 'ember';

const Validations = buildValidations({
  company: [
    validator('presence', true),
    validator('belongs-to')
  ],
  // defaultProjectStage: [
  //   validator('presence', true),
    // validator('belongs-to')
  // ],
  // provider: [
  //   // validator('presence', true),
  //   validator('belongs-to')
  // ],
  // total : [
  //   validator('presence', true),
  //   validator('number', {
  //     allowString: true,
  //     positive : true
  //   })
  // ],
  // socialSecurity : [
  //   validator('number', {
  //     allowString: true,
  //     positive : true
  //   })
  // ],

  paymentDueDate : [
    validator('date'),
    validator('presence', true),
  ],

  transPaidOn : [
    validator('date'),
  ],
});

export default DS.Model.extend(Validations,{
  route: Ember.computed(function(){
    return 'company.transactions.paychecks.paycheck';
  }),
  transactionType: Ember.computed(function(){
    return 'product.transactions.paychecks.paycheck.type_name';
  }),
  isUnpaid: Ember.computed.not('paidInFull'),
  isLate: Ember.computed('isUnpaid','paymentDueDate', function(){
    var isUnpaid = this.get('isUnpaid');
    var paymentDueDate = this.get('paymentDueDate');
    var dueDate = new Date(paymentDueDate);
    var today = new Date() ;
    if (isUnpaid && dueDate<today) {
      return true;
    }
    return false;
  }),
  description: DS.attr('string'),
  company: DS.belongsTo('company',{inverse: 'paychecks'}),
  person: DS.belongsTo('person',{inverse: 'paychecks'}),
  invoiceNumber: DS.attr('string'),
  paymentDueDate: DS.attr('date'),
  // transactionPaidOn: DS.attr('date'),
  paymentType: DS.belongsTo('payment-type',{inverse: 'paychecks'}),

  paycheckItems: DS.hasMany('paycheck-item', {inverse: 'paycheck'}),
  paymentTransactions: DS.hasMany('payment-transaction',   {inverse: 'paycheck'}),
  total: Ember.computed('paycheckItems.@each.total', 'paycheckItems.[]', function() {
    var expenseItems = this.get('paycheckItems');
    if (!expenseItems) {
      return 0;
    }
    return expenseItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),

  totalPaid: Ember.computed('paymentTransactions.@each.total', 'paymentTransactions.[]', function() {
    var paymentTransactions = this.get('paymentTransactions');
    if (!paymentTransactions) {
      return 0;
    }
    return paymentTransactions.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),

  paidInFull: Ember.computed('totalPaid', 'total', function() {
    var totalPaid = this.get('totalPaid')||0;
    var total = this.get('total')||0;
    return totalPaid >= total;
  }),
  totalLeftToPay: Ember.computed('totalPaid', 'total', function() {
    var totalPaid = this.get('totalPaid')||0;
    var total = this.get('total')||0;
    return total - totalPaid;
  })
});
