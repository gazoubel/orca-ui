import Ember from 'ember';

export default Ember.Controller.extend({
  currentPath: '',
  showPurchaseBillsBreadcrumbs: Ember.computed('currentPath', function(){
    return this.get('currentPath').includes("company.transactions.purchase-bills.purchase-bill");
  }),
});
