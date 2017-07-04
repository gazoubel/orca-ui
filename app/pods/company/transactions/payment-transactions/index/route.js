import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function () {
    return this.modelFor('company').reload();

    // var company_id = this.get('session.sessionVariables.company_id');
    //
    // return Ember.RSVP.hash({
    //   purchaseTransactions: this.store.query('purchase-transaction', {company: company_id}),
    //   paymentTransactions: this.store.query('payment-transaction', {company: company_id})
    // });
  },
  setupController: function(controller, model) {
    controller.set('paymentTransactions', model.get('paymentTransactions'));
  }
});
