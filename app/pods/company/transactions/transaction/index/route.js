import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return this.modelFor('company.transactions.transaction');
  },
  setupController: function(controller, model) {
    controller.set('purchaseTransaction', model);
  },
});
