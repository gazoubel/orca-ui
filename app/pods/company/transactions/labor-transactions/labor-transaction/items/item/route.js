import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function (params) {
    var selectedLaborTransaction = this.modelFor('company.transactions.labor-transactions.labor-transaction');

    return this.get('store').findRecord('labor-transaction-item', params.payment_transaction_item_id).then(function(laborTransactionItem){
      return laborTransactionItem.get('laborTransaction').then(function(laborTransaction){
          var laborTransactionId = laborTransaction.get('id');
          if(laborTransactionId===selectedLaborTransaction.get('id'))
          {
            return laborTransactionItem;
          }
          RSVP.reject("Labor Transaction item does not belong to this transaction.");
      });
    });
  },
});
