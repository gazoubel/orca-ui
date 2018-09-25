import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model: function (params) {
    var purchaseBillItems = this.modelFor('company.transactions.purchase-bills.purchase-bill.products');
    var items = purchaseBillItems.filterBy('id', params.purchase_transaction_item_id);

    if(!items || items.length===0){
      RSVP.reject("Product not found in this transaction.");
    } else {
      return items[0];
    }
  },
  setupController: function(controller, model) {
    controller.set('purchaseBillItem', model);
  },
});
