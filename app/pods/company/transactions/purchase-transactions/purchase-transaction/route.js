import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function (params) {
    var company_id = this.get('session.sessionVariables.company_id');
    return this.get('store').findRecord('purchase-transaction', params.purchase_transaction_id).then(function(purchaseTransaction){
      return purchaseTransaction.get('company').then(function(company){
          var transactionCompanyId = company.get('id');
          if(transactionCompanyId===company_id)
          {
            return purchaseTransaction;
          }
          RSVP.reject("Purchase Transaction does not belong to this company.");
      });
    });
  },
  setupController: function(controller, model) {
    controller.set('purchaseTransaction', model);
  },
});