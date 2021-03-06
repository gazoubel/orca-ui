import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import Ember from 'ember';

const Validations = buildValidations({
  company: [
    validator('presence', true),
    validator('belongs-to')
  ],
  // defaultProjectStage: [
  //   // validator('presence', true),
  //   validator('belongs-to')
  // ],
  // provider: [
  //   // validator('presence', true),
  //   validator('belongs-to')
  // ],
  total : [
    validator('presence', true),
    validator('number', {
      allowString: true,
      positive : true
    })
  ],
  tax : [
    validator('number', {
      allowString: true,
      positive : true
    })
  ],
  purchaseDate : [
    validator('date'),
    validator('presence', true),
  ],

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
    return 'company.transactions.purchase-bills.purchase-bill';
  }),
  transactionType: Ember.computed(function(){
    return 'product.transactions.purchase-bills.purchase-bill.type_name';
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
  // isPaid: Ember.computed('transactionPaidOn', function(){
  //   let transactionPaidOn = this.get('transactionPaidOn');
  //   return transactionPaidOn && transactionPaidOn!=null && transactionPaidOn!='';
  // }),
  // defaultProject: DS.belongsTo('project',   {inverse: 'defaultPurchaseBills'}),
  defaultProjectStage: DS.belongsTo('project-stage',   {inverse: 'defaultPurchaseBills'}),
  description: DS.attr('string'),
  company: DS.belongsTo('company',{inverse: 'purchaseBills'}),
  provider: DS.belongsTo('provider',{inverse: 'purchaseBills'}),
  total: DS.attr('number'),
  tax: DS.attr('number'),
  purchaseDate: DS.attr('date'),
  paymentDueDate: DS.attr('date'),
  // transactionPaidOn: DS.attr('date'),
  paymentType: DS.belongsTo('payment-type',{inverse: 'purchaseBills'}),
  invoiceNumber: DS.attr('string'),

  purchaseBillItems: DS.hasMany('purchase-bill-item', {inverse: 'purchaseBill'}),
  paymentTransactions: DS.hasMany('payment-transaction',   {inverse: 'purchaseBill'}),
  other: Ember.computed('total','totalExpense', 'tax', function() {
    var total = this.get('total')||0;
    var tax = this.get('tax') || 0;
    var totalExpense = this.get('totalExpense') || 0;
    var totalOther = total - tax - totalExpense;
    if (!totalOther) {
      return 0;
    }
    return totalOther;
  }),
  totalExpense: Ember.computed('purchaseBillItems.@each.total', 'purchaseBillItems.[]', function() {
    var expenseItems = this.get('purchaseBillItems');
      if (!expenseItems || expenseItems.get('length')===0) {
        return 0;
      }
      return expenseItems.reduce(function(prev, item) {
        return (prev || 0) + Number(item.get('total'));
      });
  }),
  subTotal: Ember.computed('totalExpense', 'other', function() {
    var totalExpense = this.get('totalExpense')  || 0;
    var other = this.get('other') || 0;
    return totalExpense + other;
  }),
  totalPaid: Ember.computed('paymentTransactions.@each.total', 'paymentTransactions.[]', function() {

    var paymentTransactions = this.get('paymentTransactions');
    if (!paymentTransactions || paymentTransactions.get('length')===0) {
      return 0;
    }
    return paymentTransactions.reduce(function(prev, item) {
      var total = item.get('total') || 0;
      return (prev || 0) + Number(total);
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
