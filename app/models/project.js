import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import Ember from 'ember';

const Validations = buildValidations({
  name: validator('presence', true),
  // projectStages: validator('has-many'),
  company: [
    validator('presence', true)
    // ,
    // validator('belongs-to')
  ],
  totalClosingAmount : validator('number', {
    allowString: true,
    positive : true
  })
});

export default DS.Model.extend(Validations,{
  name: DS.attr('string'),
  projectStages: DS.hasMany('project-stage', {inverse: 'project'}),
  company: DS.belongsTo('company',{inverse: 'projects'}),
  assignee: DS.belongsTo('person',{inverse: 'projects'}),
  // defaultPurchaseTransactions: DS.hasMany('purchase-transaction', {inverse: 'defaultProject'}),
  totalClosingAmount: DS.attr('number'),
  isArchived: DS.attr('boolean'),
  isActive: Ember.computed.not('isArchived'),
  totalSpent: Ember.computed( 'projectStages.@each.total', 'projectStages.[]',function() {
    var projectStages = this.get('projectStages');
    if (!projectStages) {
      return 0;
    }
    return projectStages.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),
  predictedTotal: Ember.computed( 'projectStages.@each.predictedTotal', 'projectStages.[]',function() {
    var projectStages = this.get('projectStages');
    if (!projectStages) {
      return 0;
    }
    return projectStages.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('predictedTotal'));
    });
  }),

  finishedStages: Ember.computed( 'projectStages.@each.isFinished',function() {
    var projectStages = this.get('projectStages');
    if (!projectStages || projectStages.get('length')==0) {
      return 0;
    }
    return projectStages.reduce(function(prev, item) {
      return (prev || 0) + (item.get('isFinished')?1:0);
    });
  }),

  canBeClosed: Ember.computed( 'projectStages.[]', 'finishedStages',function() {
    var finishedStages = this.get('finishedStages');
    var projectStagesLength = this.get('projectStages.length');

    return projectStagesLength!=0 && finishedStages === projectStagesLength;
  }),

  wasVeryProfitable: Ember.computed( 'totalSpent','predictedTotal',function() {
    var totalSpent = this.get('totalSpent');
    var predictedTotal = this.get('predictedTotal');

    return totalSpent <= predictedTotal;
  }),

  wasProfitable: Ember.computed( 'totalSpent','predictedTotal',function() {
    var totalSpent = this.get('totalSpent');
    // var predictedTotal = this.get('predictedTotal');
    var totalClosingAmount = this.get('totalClosingAmount');

    return totalSpent < totalClosingAmount;
    // return ((totalSpent>predictedTotal) && (totalSpent < totalClosingAmount));
  }),

  wasNotProfitable: Ember.computed.not('wasProfitable'),

});
