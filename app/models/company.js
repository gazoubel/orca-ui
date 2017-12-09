import DS from 'ember-data';
import Ember from 'ember';

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  userRelationships: validator('has-many'),
  stages: validator('has-many'),
  providers: validator('has-many'),
  paymentTypes: validator('has-many'),
  itemTypes: validator('has-many'),
  projects: validator('has-many'),
  items: validator('has-many'),
  laborItems: validator('has-many'),
  people: validator('has-many')

});

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  acronym: DS.attr('string'),
  userRelationships: DS.hasMany('company-to-user', {inverse: 'company'}),
  stages: DS.hasMany('stage', {inverse: 'company'}),
  providers: DS.hasMany('provider', {inverse: 'company'}),
  paymentTypes: DS.hasMany('payment-type', {inverse: 'company'}),
  itemTypes: DS.hasMany('item-type', {inverse: 'company'}),
  projects: DS.hasMany('project', {inverse: 'company'}),
  purchaseTransactions: DS.hasMany('purchase-transaction', {inverse: 'company'}),
  paychecks: DS.hasMany('paycheck', {inverse: 'company'}),
  items: DS.hasMany('item', {inverse: 'company'}),
  laborItems: DS.hasMany('labor-item', {inverse: 'company'}),
  people: DS.hasMany('person', {inverse: 'company'}),
  privileges: DS.hasMany('privilege', {inverse: 'company'}),
  paymentTransactions: DS.hasMany('payment-transaction',   {inverse: 'company'}),

  // activeProjects: Ember.computed.filterBy('projects','isArchived', false),
  unpaidPurchaseTransactions: Ember.computed('purchaseTransactions.@each','purchaseTransactions.@each.isUnpaid', 'purchaseTransactions.[]', function(){
    return this.get('purchaseTransactions').then(function(purchaseTransactions){
      return purchaseTransactions.filterBy('isUnpaid', true);
    });
    // let transactions = Ember.get(this, 'purchaseTransactions');
    // return transactions.filterBy('isUnpaid', true);
  }),
  // unpaidpaychecks: Ember.computed.filterBy('purchaseTransactions.[]','purchaseTransactions.@each.isPaid', 'isPaid', false),
  // unpaidPurchaseTransactions: Ember.computed('purchaseTransactions.@each.isUnpaid', 'purchaseTransactions.[]', function(){
  //   let transactions = Ember.get(this, 'purchaseTransactions');
  //   return transactions.filterBy('isUnpaid', true);
  // }),
  unpaidpaychecks: Ember.computed('paychecks.@each','paychecks.@each.isUnpaid', 'paychecks.[]', function(){
    return this.get('paychecks').then(function(paychecks){
      return paychecks.filterBy('isUnpaid', true);
    });
    // let transactions = Ember.get(this, 'paychecks');
    // return transactions.filterBy('isUnpaid', true);
  })
  // unpaidPurchaseTransactions: Ember.computed.filterBy('purchaseTransactions.[]', 'isPaid', false),
  // unpaidpaychecks: Ember.computed.filterBy('paychecks.[]', 'isPaid', false)
});
