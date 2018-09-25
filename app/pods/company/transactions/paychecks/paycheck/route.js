import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function (params) {
    var loggedCompany = this.modelFor('company');

    // var company_id = this.get('session.sessionVariables.company_id');
    return this.get('store').findRecord('paycheck', params.payment_transaction_id).then(function(paycheck){
      return paycheck.get('company').then(function(company){
          var transactionCompanyId = company.get('id');
          if(transactionCompanyId===loggedCompany.get('id'))
          {
            return paycheck;
          }
          RSVP.reject("Labor Transaction does not belong to this company.");
      });
    });
  },
  setupController: function(controller, model) {
    controller.set('paycheck', model);
  },
});
