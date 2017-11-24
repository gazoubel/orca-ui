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
    return 'company.transactions.labor-transactions.labor-transaction';
  }),
  transactionType: Ember.computed(function(){
    return 'product.transactions.labor-transactions.labor-transaction.type_name';
  }),
  isUnpaid: Ember.computed.empty('transPaidOn', null),
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
  // isPaid: Ember.computed('transPaidOn', function(){
  //   let transPaidOn = this.get('transPaidOn');
  //   return transPaidOn && transPaidOn!=null && transPaidOn!='';
  // }),
  // defaultProjectStage: DS.belongsTo('project-stage',   {inverse: 'defaultPaymentTranss'}),
  description: DS.attr('string'),
  company: DS.belongsTo('company',{inverse: 'laborTransactions'}),
  person: DS.belongsTo('person',{inverse: 'laborTransactions'}),
  // total: DS.attr('number'),
  // socialSecurity: DS.attr('number'),
  invoiceNumber: DS.attr('string'),
  // purchaseDate: DS.attr('date'),
  paymentDueDate: DS.attr('date'),
  transPaidOn: DS.attr('date'),
  paymentType: DS.belongsTo('payment-type',{inverse: 'laborTransactions'}),

  laborTransactionItems: DS.hasMany('labor-transaction-item', {inverse: 'laborTransaction'}),
  // paymentRoles: Ember.computed.map('paymentTransItems.@each','paymentTransItems.[]', function(item, index) {
  //   var laborName = item.get('laborItem.name');
  //   return laborName?laborName:'other';
  // }),
  total: Ember.computed('laborTransactionItems.@each.total', 'laborTransactionItems.[]', function() {
    var expenseItems = this.get('laborTransactionItems');
    if (!expenseItems) {
      return 0;
    }
    return expenseItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),
});
