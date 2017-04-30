import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import Ember from 'ember';

const Validations = buildValidations({
  name: validator('presence', true),
  project: [
    validator('belongs-to')
  ],
  previous: [
    validator('belongs-to')
  ],
  next: [
    validator('belongs-to')
  ],
  purchaseTransactionItems: validator('has-many'),
  defaultPurchaseTransactions: validator('has-many'),

});

export default DS.Model.extend(Validations,{
  name: DS.attr('string'),
  project: DS.belongsTo('project',{inverse: 'projectStages'}),
  previous: DS.belongsTo('project-stage',{inverse: 'next'}),
  next: DS.belongsTo('project-stage',{inverse: 'previous'}),
  purchaseTransactionItems: DS.hasMany('purchase-transaction-item', {inverse: 'projectStage'}),
  defaultPurchaseTransactions: DS.hasMany('purchase-transaction', {inverse: 'defaultProjectStage'}),
  defaultPaymentTransactions: DS.hasMany('payment-transaction', {inverse: 'defaultProjectStage'}),
  // isFirstItem: Ember.computed('previous', function() {
  //   var previous = this.get('previous');
  //   if (!previous) {
  //     return true;
  //   }
  //   return false;
  // }),
  isLastItem: Ember.computed('previous','next', function() {
    var next = this.get('next');
    if (next===null || !next.get('id')) {
      return true;
    }
    return false;
  }),
  sortOrder: Ember.computed('previous.sortOrder', 'previous', 'next', function(){
    var previous = this.get('previous');
    if (previous===null || !previous.get('id')) {
      return 0;
    }
    var previousSortOrder = previous.get('sortOrder');
    return previousSortOrder+1;

    // var _this = this;
    // this.get('previous').then(function(previous) {
    //   if (previous===null || !previous.get('id')) {
    //     return 0;
    //   }
    //   var previousSortOrder = previous.get('sortOrder');
    //   return previousSortOrder+1;
    // });
  })
});
