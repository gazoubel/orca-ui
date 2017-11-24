import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.modelFor('company.transactions.labor-transactions.labor-transaction');
  },
  setupController: function(controller, model) {
    controller.set('laborTransaction', model);
  }
});
