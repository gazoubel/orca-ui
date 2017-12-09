import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function (params) {
    var selectedPaycheck = this.modelFor('company.transactions.paychecks.paycheck');

    return this.get('store').findRecord('paycheck-item', params.payment_transaction_item_id).then(function(paycheckItem){
      return paycheckItem.get('paycheck').then(function(paycheck){
          var paycheckId = paycheck.get('id');
          if(paycheckId===selectedPaycheck.get('id'))
          {
            return paycheckItem;
          }
          Ember.RSVP.reject("Labor Transaction item does not belong to this transaction.");
      });
    });
  },
});
