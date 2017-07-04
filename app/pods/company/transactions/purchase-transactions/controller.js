import Ember from 'ember';

export default Ember.Controller.extend({
  currentPath: '',
  showPurchaseTransactionsBreadcrumbs: Ember.computed('currentPath', function(){
    return this.get('currentPath').includes("company.transactions.purchase-transactions.purchase-transaction");
  }),
});
