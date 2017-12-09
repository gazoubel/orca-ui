import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.modelFor('company.transactions.paychecks.paycheck');
  },
  setupController: function(controller, model) {
    controller.set('paycheck', model);
  }
});
