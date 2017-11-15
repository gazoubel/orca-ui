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

  transactionPaidOn : [
    validator('date'),
  ],
});

export default DS.Model.extend(Validations,{
  route: Ember.computed(function(){
    return 'company.transactions.payment-transactions.payment-transaction';
  }),
  transactionType: Ember.computed(function(){
    return 'product.transactions.payment-transactions.payment-transaction.type_name';
  }),
  isUnpaid: Ember.computed.empty('transactionPaidOn', null),
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
  // isPaid: Ember.computed('transactionPaidOn', function(){
  //   let transactionPaidOn = this.get('transactionPaidOn');
  //   return transactionPaidOn && transactionPaidOn!=null && transactionPaidOn!='';
  // }),
  // defaultProjectStage: DS.belongsTo('project-stage',   {inverse: 'defaultPaymentTransactions'}),
  description: DS.attr('string'),
  company: DS.belongsTo('company',{inverse: 'paymentTransactions'}),
  person: DS.belongsTo('person',{inverse: 'paymentTransactions'}),
  // total: DS.attr('number'),
  // socialSecurity: DS.attr('number'),
  invoiceNumber: DS.attr('string'),
  // purchaseDate: DS.attr('date'),
  paymentDueDate: DS.attr('date'),
  transactionPaidOn: DS.attr('date'),
  paymentType: DS.belongsTo('payment-type',{inverse: 'paymentTransactions'}),

  paymentTransactionItems: DS.hasMany('payment-transaction-item', {inverse: 'paymentTransaction'}),
  // paymentRoles: Ember.computed.map('paymentTransactionItems.@each','paymentTransactionItems.[]', function(item, index) {
  //   var laborName = item.get('laborItem.name');
  //   return laborName?laborName:'other';
  // }),
  total: Ember.computed('paymentTransactionItems.@each.total', 'paymentTransactionItems.[]', function() {
    var expenseItems = this.get('paymentTransactionItems');
    if (!expenseItems) {
      return 0;
    }
    return expenseItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),
});
