import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function () {
    return this.modelFor('company').reload();

    // var company_id = this.get('session.sessionVariables.company_id');
    //
    // return Ember.RSVP.hash({
    //   purchaseBills: this.store.query('purchase-bill', {company: company_id}),
    //   paychecks: this.store.query('paycheck', {company: company_id})
    // });
  },
  setupController: function(controller, model) {
    controller.set('paychecks', model.get('paychecks'));
  }
});
