import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.modelFor('company.transactions.payment-transactions.payment-transaction');
  },
  setupController: function(controller, model) {
    controller.set('paymentTransaction', model);
  }
});
