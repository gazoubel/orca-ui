import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    var model = this.modelFor('company.transactions.purchase-bills.purchase-bill');
    return Ember.get(model, 'purchaseBillItems');
  }
});
