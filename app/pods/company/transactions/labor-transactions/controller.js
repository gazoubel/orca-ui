import Ember from 'ember';

export default Ember.Controller.extend({
  currentPath: '',
  showlaborTransactionsBreadcrumbs: Ember.computed('currentPath', function(){
    return this.get('currentPath').includes("company.transactions.labor-transactions.labor-transaction");
  }),
});
