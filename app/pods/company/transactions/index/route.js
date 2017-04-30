import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function () {
    var company_id = this.get('session.sessionVariables.company_id');
    // return this.store.findAll('purchase-transaction', {company: company_id});

    return Ember.RSVP.hash({
      purchaseTransactions: this.store.findAll('purchase-transaction', {company: company_id}),
      paymentTransactions: this.store.findAll('payment-transaction', {company: company_id})
    });
  },
  setupController: function(controller, models) {
    controller.set('purchaseTransactions', models.purchaseTransactions);
    controller.set('paymentTransactions', models.paymentTransactions);
  }
});
