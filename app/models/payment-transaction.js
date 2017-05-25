import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import Ember from 'ember';

const Validations = buildValidations({
  company: [
    validator('presence', true),
    validator('belongs-to')
  ],
  defaultProjectStage: [
    validator('presence', true),
    // validator('belongs-to')
  ],
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
  socialSecurity : [
    validator('number', {
      allowString: true,
      positive : true
    })
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
    return 'company.transactions.payment-transactions.payment-transaction';
  }),
  transactionType: Ember.computed(function(){
    return 'product.transactions.payment-transactions.payment-transaction.type_name';
  }),
  defaultProjectStage: DS.belongsTo('project-stage',   {inverse: 'defaultPaymentTransactions'}),
  description: DS.attr('string'),
  company: DS.belongsTo('company',{inverse: 'paymentTransactions'}),
  person: DS.belongsTo('person',{inverse: 'paymentTransactions'}),
  // total: DS.attr('number'),
  socialSecurity: DS.attr('number'),
  invoiceNumber: DS.attr('string'),
  // purchaseDate: DS.attr('date'),
  paymentDueDate: DS.attr('date'),
  transactionPaidOn: DS.attr('date'),
  paymentType: DS.belongsTo('payment-type',{inverse: 'paymentTransactions'}),

  paymentTransactionItems: DS.hasMany('payment-transaction-item', {inverse: 'paymentTransaction'}),
  total: Ember.computed('socialSecurity','subTotal', function() {
    var subTotal = this.get('subTotal')|| 0;
    var socialSecurity = this.get('socialSecurity') || 0;
    var total = subTotal + socialSecurity;
    if (!total) {
      return 0;
    }
    return total;
  }),
  subTotal: Ember.computed('paymentTransactionItems.@each.total', 'paymentTransactionItems.[]', function() {
    var expenseItems = this.get('paymentTransactionItems');
    if (!expenseItems) {
      return 0;
    }
    return expenseItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),
});
