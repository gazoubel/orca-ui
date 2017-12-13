import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function () {
    return this.modelFor('company').reload();
  },
  setupController: function(controller, model) {
    controller.set('purchaseBills', model.get('purchaseBills'));
  }
});
