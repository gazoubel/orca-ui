import Ember from 'ember';

export default Ember.Controller.extend({
  currentPath: '',
  showpaychecksBreadcrumbs: Ember.computed('currentPath', function(){
    return this.get('currentPath').includes("company.transactions.paychecks.paycheck");
  }),
});
