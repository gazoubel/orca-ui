import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.modelFor('company.transactions.purchase-transactions.purchase-transaction');
  },
  setupController: function(controller, model) {
    controller.set('purchaseTransaction', model);
  }
});
