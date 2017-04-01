import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    var model = this.modelFor('company.transactions.purchase-transactions.purchase-transaction');
    return Ember.get(model, 'purchaseTransactionItems');
  }
});
