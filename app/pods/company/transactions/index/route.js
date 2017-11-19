import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function () {
    var company = this.modelFor('company');
    return Ember.RSVP.hash({
      purchaseTransactions: company.get('unpaidPurchaseTransactions'),
      paymentTransactions: company.get('unpaidPaymentTransactions')
    });

    // return this.modelFor('company').then(function(company){
    //   // company.get('unpaidPurchaseTransactions');
    //   // company.get('unpaidPaymentTransactions');
    //   return Ember.RSVP.hash({
    //     purchaseTransactions: company.get('unpaidPurchaseTransactions'),
    //     paymentTransactions: company.get('unpaidPaymentTransactions')
    //   });
    // });
    // return this.modelFor('company');

    // var company_id = this.get('session.sessionVariables.company_id');
    //
    // return Ember.RSVP.hash({
    //   purchaseTransactions: this.store.query('purchase-transaction', {company: company_id, transactionPaidOn: null}),
    //   paymentTransactions: this.store.query('payment-transaction', {company: company_id, transactionPaidOn: null})
    // });
  },
  setupController: function(controller, models) {
    controller.set('purchaseTransactions', models.purchaseTransactions);
    controller.set('paymentTransactions', models.paymentTransactions);
  }
});
