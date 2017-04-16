import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import Ember from 'ember';

const Validations = buildValidations({
  company: [
    validator('presence', true),
    validator('belongs-to')
  ],
  // defaultProject: [
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
});

export default DS.Model.extend(Validations,{
  route: Ember.computed(function(){
    return 'company.transactions.purchase-transactions.purchase-transaction';
  }),
  defaultProject: DS.belongsTo('project',   {inverse: 'defaultPurchaseTransactions'}),
  description: DS.attr('string'),
  company: DS.belongsTo('company',{inverse: 'purchaseTransactions'}),
  provider: DS.belongsTo('provider',{inverse: 'purchaseTransactions'}),
  total: DS.attr('number'),
  tax: DS.attr('number'),
  purchaseTransactionItems: DS.hasMany('purchase-transaction-item', {inverse: 'purchaseTransaction'}),
  other: Ember.computed('total','totalExpense', function() {
    var total = this.get('total');
    var tax = this.get('tax') || 0;
    var totalExpense = this.get('totalExpense');
    var totalOther = total - tax - totalExpense;
    if (!totalOther) {
      return 0;
    }
    return totalOther;
  }),
  totalExpense: Ember.computed('purchaseTransactionItems.@each.total', 'purchaseTransactionItems.[]', function() {
    var expenseItems = this.get('purchaseTransactionItems');
    if (!expenseItems) {
      return 0;
    }
    return expenseItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),
  subTotal: Ember.computed('totalExpense', 'other', function() {
    var totalExpense = this.get('totalExpense') || 0;
    var other = this.get('other') || 0;
    return totalExpense + other;
  }),
});
