import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    var purchaseTransactionItems = this.modelFor('company.transactions.purchase-transactions.purchase-transaction.products');
    var items = purchaseTransactionItems.filterBy('id', params.purchase_transaction_item_id);

    if(!items || items.length===0){
      RSVP.reject("Product not found in this transaction.");
    } else {
      return items[0];
    }
  },
  setupController: function(controller, model) {
    controller.set('purchaseTransactionItem', model);
  },
});
