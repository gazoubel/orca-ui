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
  purchaseBills: DS.hasMany('purchase-bill', {inverse: 'company'}),
  paychecks: DS.hasMany('paycheck', {inverse: 'company'}),
  items: DS.hasMany('item', {inverse: 'company'}),
  laborItems: DS.hasMany('labor-item', {inverse: 'company'}),
  people: DS.hasMany('person', {inverse: 'company'}),
  privileges: DS.hasMany('privilege', {inverse: 'company'}),
  paymentTransactions: DS.hasMany('payment-transaction',   {inverse: 'company'}),

  // activeProjects: Ember.computed.filterBy('projects','isArchived', false),
  unpaidPurchaseBills: Ember.computed('purchaseBills.@each','purchaseBills.@each.isUnpaid', 'purchaseBills.[]', function(){
    return this.get('purchaseBills').then(function(purchaseBills){
      return purchaseBills.filterBy('isUnpaid', true);
    });
    // let transactions = Ember.get(this, 'purchaseBills');
    // return transactions.filterBy('isUnpaid', true);
  }),
  // unpaidpaychecks: Ember.computed.filterBy('purchaseBills.[]','purchaseBills.@each.isPaid', 'isPaid', false),
  // unpaidPurchaseBills: Ember.computed('purchaseBills.@each.isUnpaid', 'purchaseBills.[]', function(){
  //   let transactions = Ember.get(this, 'purchaseBills');
  //   return transactions.filterBy('isUnpaid', true);
  // }),
  unpaidpaychecks: Ember.computed('paychecks.@each','paychecks.@each.isUnpaid', 'paychecks.[]', function(){
    return this.get('paychecks').then(function(paychecks){
      return paychecks.filterBy('isUnpaid', true);
    });
    // let transactions = Ember.get(this, 'paychecks');
    // return transactions.filterBy('isUnpaid', true);
  })
  // unpaidPurchaseBills: Ember.computed.filterBy('purchaseBills.[]', 'isPaid', false),
  // unpaidpaychecks: Ember.computed.filterBy('paychecks.[]', 'isPaid', false)
});
