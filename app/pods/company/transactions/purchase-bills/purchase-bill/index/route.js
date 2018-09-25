import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.modelFor('company.transactions.purchase-bills.purchase-bill');
  },
  setupController: function(controller, model) {
    controller.set('purchaseBill', model);
  }
});
