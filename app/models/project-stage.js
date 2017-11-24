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
  purchaseTransactionItems: validator('has-many'),
  // defaultPurchaseTransactions: validator('has-many'),
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
  purchaseTransactionItems: DS.hasMany('purchase-transaction-item', {inverse: 'projectStage'}),
  laborTransactionItems: DS.hasMany('labor-transaction-item', {inverse: 'projectStage'}),

  defaultPurchaseTransactions: DS.hasMany('purchase-transaction', {inverse: 'defaultProjectStage'}),
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
  // defaultlaborTransactions: DS.hasMany('labor-transaction', {inverse: 'defaultProjectStage'}),
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
  totalPurchaseTransactionItems: Ember.computed( 'purchaseTransactionItems.@each.total', 'purchaseTransactionItems.[]',function() {
    var purchaseTransactionItems = this.get('purchaseTransactionItems');
    if (!purchaseTransactionItems) {
      return 0;
    }
    return purchaseTransactionItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('total'));
    });
  }),
  // 'total','totalExpense', 'tax'
  totalDefaultPurchaseTransactions: Ember.computed('defaultPurchaseTransactions.@each','defaultPurchaseTransactions.@each.other', 'defaultPurchaseTransactions.[]', function() {
    var defaultPurchaseTransactions = this.get('defaultPurchaseTransactions');
    if (!defaultPurchaseTransactions) {
      return 0;
    }
    return defaultPurchaseTransactions.reduce(function(prev, item) {
      var other = item.get('other') || 0;
      var tax = item.get('tax') || 0;
      return (prev || 0) + Number(other)+ Number(tax);
    });
  }),
  totalPurchase: Ember.computed('totalPurchaseTransactionItems', 'totalDefaultPurchaseTransactions', function() {
    var totalPurchaseTransactionItems = this.get('totalPurchaseTransactionItems')||0;
    var totalDefaultPurchaseTransactions = this.get('totalDefaultPurchaseTransactions') || 0;
    var total = totalPurchaseTransactionItems +totalDefaultPurchaseTransactions;
    if (!total) {
      return 0;
    }
    return total;
  }),
  quantityOfPaymentItems: Ember.computed( 'laborTransactionItems.@each.quantity', 'laborTransactionItems.[]',function() {
    var laborTransactionItems = this.get('laborTransactionItems');
    if (!laborTransactionItems || laborTransactionItems.get('length')===0) {
      return 0;
    }
    return laborTransactionItems.reduce(function(prev, item) {
      return (prev || 0) + Number(item.get('quantity'));
    });
  }),
  totalPayments: Ember.computed( 'laborTransactionItems.@each.total', 'laborTransactionItems.[]',function() {
    var laborTransactionItems = this.get('laborTransactionItems');
    if (!laborTransactionItems || laborTransactionItems.get('length')===0) {
      return 0;
    }
    return laborTransactionItems.reduce(function(prev, item) {
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

  quantityOfPurchaseTransactionItems: Ember.computed( 'purchaseTransactionItems.@each.total', 'purchaseTransactionItems.[]',function() {
    var purchaseTransactionItems = this.get('purchaseTransactionItems');
    if (!purchaseTransactionItems || purchaseTransactionItems.get('length')===0) {
      return 0;
    }
    return purchaseTransactionItems.reduce(function(prev, item) {
      var quantity = item.get('quantity')||0;
      return (prev || 0) + Number(quantity);
    });
  }),
  quantityOfDefaultPurchaseTransactions: Ember.computed('defaultPurchaseTransactions.@each','defaultPurchaseTransactions.@each.other', 'defaultPurchaseTransactions.[]', function() {
    var defaultPurchaseTransactions = this.get('defaultPurchaseTransactions');
    if (!defaultPurchaseTransactions) {
      return 0;
    }
    return defaultPurchaseTransactions.reduce(function(prev) {
      return (prev || 0) + 1;
    });
  }),

  quantityOfTotalItems: Ember.computed('quantityOfPurchaseTransactionItems', 'quantityOfDefaultPurchaseTransactions', function() {
    var quantityOfPurchaseTransactionItems = this.get('quantityOfPurchaseTransactionItems')||0;
    var quantityOfDefaultPurchaseTransactions = this.get('quantityOfDefaultPurchaseTransactions') || 0;
    return quantityOfPurchaseTransactionItems+quantityOfDefaultPurchaseTransactions;
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
