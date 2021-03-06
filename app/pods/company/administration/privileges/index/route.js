import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function () {
    // var company_id = this.get('session.sessionVariables.company_id');
    // // return this.store.query('payment-type', {company: company_id});
    // return this.get('store').findRecord('company', company_id);
    return this.modelFor('company').reload();
  },
  setupController: function(controller, model) {
    controller.set('privileges', model.get('privileges'));
  }
});
