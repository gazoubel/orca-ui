import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function () {
    var company = this.modelFor('company');
    return Ember.RSVP.hash({
      purchaseTransactions: company.get('unpaidPurchaseTransactions'),
      paychecks: company.get('unpaidpaychecks')
    });

    // return this.modelFor('company').then(function(company){
    //   // company.get('unpaidPurchaseTransactions');
    //   // company.get('unpaidpaychecks');
    //   return Ember.RSVP.hash({
    //     purchaseTransactions: company.get('unpaidPurchaseTransactions'),
    //     paychecks: company.get('unpaidpaychecks')
    //   });
    // });
    // return this.modelFor('company');

    // var company_id = this.get('session.sessionVariables.company_id');
    //
    // return Ember.RSVP.hash({
    //   purchaseTransactions: this.store.query('purchase-transaction', {company: company_id, transactionPaidOn: null}),
    //   paychecks: this.store.query('paycheck', {company: company_id, transactionPaidOn: null})
    // });
  },
  setupController: function(controller, models) {
    controller.set('purchaseTransactions', models.purchaseTransactions);
    controller.set('paychecks', models.paychecks);
  }
});
