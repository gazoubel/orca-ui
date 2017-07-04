import Ember from 'ember';

export default Ember.Controller.extend({
  currentPath: '',
  showPaymentTransactionsBreadcrumbs: Ember.computed('currentPath', function(){
    return this.get('currentPath').includes("company.transactions.payment-transactions.payment-transaction");
  }),
});
