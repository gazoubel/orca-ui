import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import Ember from 'ember';
import moment from 'moment';

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
  purchaseBillItems: validator('has-many'),
  // defaultPurchaseBills: validator('has-many'),
  predictedTotal : validator('number', {
    allowString: true,
    positive : true
  }),
  startedOn : [
    validator('date'),
  ],
  finishedOn : [
    validator('date'),
  ],

});

export default DS.Model.extend(Validations,{
  name: DS.attr('string'),
  project: DS.belongsTo('project',{inverse: 'projectStages'}),
  stage: DS.belongsTo('stage',{inverse: 'projectStages'}),
  previous: DS.belongsTo('project-stage',{inverse: 'next'}),
  next: DS.belongsTo('project-stage',{inverse: 'previous'}),
  purchaseBillItems: DS.hasMany('purchase-bill-item', {inverse: 'projectStage'}),
  paycheckItems: DS.hasMany('paycheck-item', {inverse: 'projectStage'}),

  defaultPurchaseBills: DS.hasMany('purchase-bill', {inverse: 'defaultProjectStage'}),
  predictedTotal: DS.attr('number'),
  startedOn: DS.attr('date'),
  finishedOn: DS.attr('date'),

  isWaiting: Ember.computed('startedOn', 'finishedOn', function(){
    var startedOn = this.get('startedOn');
    var finishedOn = this.get('finishedOn');
    if(!startedOn && !finishedOn) {
      return true;
    }

    return !moment(startedOn).isValid() && !moment(finishedOn).isValid();
  }),
  isInProgress: Ember.computed('startedOn', 'finishedOn', function(){
    var startedOn = this.get('startedOn');
    var finishedOn = this.get('finishedOn');

    return (startedOn && moment(startedOn).isValid()) && (!finishedOn || !moment(finishedOn).isValid());
  }),

  isFinished: Ember.computed('startedOn', 'finishedOn', function(){
    var startedOn = moment(this.get('startedOn'));
    var finishedOn = moment(this.get('finishedOn'));
    if(!startedOn || !finishedOn) {
      return false;
    }

    return startedOn.isValid() && finishedOn.isValid();
  }),
  // defaultpaychecks: DS.hasMany('paycheck', {inverse: 'defaultProjectStage'}),
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
  }) ,
  totalPurchaseBillItems: Ember.computed( 'purchaseBillItems.@each.total', 'purchaseBillItems.[]',function() {
    var purchaseBillItems = this.get('purchaseBillItems');
    if (!purchaseBillItems) {
      return 0;
    }
    return purchaseBillItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),
  // 'total','totalExpense', 'tax'
  totalDefaultPurchaseBills: Ember.computed('defaultPurchaseBills.@each','defaultPurchaseBills.@each.other', 'defaultPurchaseBills.[]', function() {
    var defaultPurchaseBills = this.get('defaultPurchaseBills');
    if (!defaultPurchaseBills) {
      return 0;
    }
    return defaultPurchaseBills.reduce(function(prev, item) {
      var other = item.get('other') || 0;
      var tax = item.get('tax') || 0;
      return (prev || 0) + Number(other)+ Number(tax);
    });
  }),
  totalPurchase: Ember.computed('totalPurchaseBillItems', 'totalDefaultPurchaseBills', function() {
    var totalPurchaseBillItems = this.get('totalPurchaseBillItems')||0;
    var totalDefaultPurchaseBills = this.get('totalDefaultPurchaseBills') || 0;
    var total = totalPurchaseBillItems +totalDefaultPurchaseBills;
    if (!total) {
      return 0;
    }
    return total;
  }),
  quantityOfPaymentItems: Ember.computed( 'paycheckItems.@each.quantity', 'paycheckItems.[]',function() {
    var paycheckItems = this.get('paycheckItems');
    if (!paycheckItems || paycheckItems.get('length')===0) {
      return 0;
    }
    return paycheckItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('quantity'));
    });
  }),
  totalPayments: Ember.computed( 'paycheckItems.@each.total', 'paycheckItems.[]',function() {
    var paycheckItems = this.get('paycheckItems');
    if (!paycheckItems || paycheckItems.get('length')===0) {
      return 0;
    }
    return paycheckItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),

  total: Ember.computed('totalPurchase', 'totalPayments', function() {
    var totalPurchase = this.get('totalPurchase')||0;
    var totalPayments = this.get('totalPayments') || 0;
    var total = totalPurchase +totalPayments;
    if (!total) {
      return 0;
    }
    return total;
  }),

  quantityOfPurchaseBillItems: Ember.computed( 'purchaseBillItems.@each.total', 'purchaseBillItems.[]',function() {
    var purchaseBillItems = this.get('purchaseBillItems');
    if (!purchaseBillItems || purchaseBillItems.get('length')===0) {
      return 0;
    }
    return purchaseBillItems.reduce(function(prev, item) {
      var quantity = item.get('quantity')||0;
      return (prev || 0) + Number(quantity);
    });
  }),
  quantityOfDefaultPurchaseBills: Ember.computed('defaultPurchaseBills.@each','defaultPurchaseBills.@each.other', 'defaultPurchaseBills.[]', function() {
    var defaultPurchaseBills = this.get('defaultPurchaseBills');
    if (!defaultPurchaseBills) {
      return 0;
    }
    return defaultPurchaseBills.reduce(function(prev) {
      return (prev || 0) + 1;
    });
  }),

  quantityOfTotalItems: Ember.computed('quantityOfPurchaseBillItems', 'quantityOfDefaultPurchaseBills', function() {
    var quantityOfPurchaseBillItems = this.get('quantityOfPurchaseBillItems')||0;
    var quantityOfDefaultPurchaseBills = this.get('quantityOfDefaultPurchaseBills') || 0;
    return quantityOfPurchaseBillItems+quantityOfDefaultPurchaseBills;
  }),

  percentageSpent: Ember.computed('total', 'predictedTotal', function() {
    var total = this.get('total')||0;
    var predictedTotal = this.get('predictedTotal') || 0;
    return ( (total*100) / predictedTotal );
  }),

  isOnTrack: Ember.computed('percentageSpent', function() {
    var percentageSpent = this.get('percentageSpent')||0;
    return  percentageSpent<=100;
  }),
});
