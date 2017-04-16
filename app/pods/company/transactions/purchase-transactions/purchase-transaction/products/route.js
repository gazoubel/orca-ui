import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    var model = this.modelFor('company.transactions.purchase-transactions.purchase-transaction');
    return Ember.get(model, 'purchaseTransactionItems');
  }
});
