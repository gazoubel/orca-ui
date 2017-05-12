import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function (params) {
    var company_id = this.get('session.sessionVariables.company_id');
    return this.get('store').findRecord('payment-transaction', params.payment_transaction_id).then(function(paymentTransaction){
      return paymentTransaction.get('company').then(function(company){
          var transactionCompanyId = company.get('id');
          if(transactionCompanyId===company_id)
          {
            return paymentTransaction;
          }
          RSVP.reject("Payment Transaction does not belong to this company.");
      });
    });
  },
  setupController: function(controller, model) {
    controller.set('paymentTransaction', model);
  },
});
