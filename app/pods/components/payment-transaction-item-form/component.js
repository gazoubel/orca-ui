import Ember from 'ember';

export default Ember.Component.extend({
  itemService: Ember.inject.service(),
  paymentTransactionItem: null,
  allProjects: null,
  allItems: null,
  selectedProject: null,
  didReceiveAttrs() {
    this._super(...arguments);
    const project = this.get('paymentTransactionItem.projectStage.project');
    this.set('selectedProject', project);
  },
  actions: {
    save(paymentTransactionItem) {
      var _ref = this;

      if (!paymentTransactionItem.get('validations.isValid')) {
        _ref.get('appManager').notify('error', paymentTransactionItem.get('validations.messages'));
        return;
      }
      return paymentTransactionItem.save().then(function(){
        _ref.sendAction('onSaveClicked', paymentTransactionItem);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(paymentTransactionItem) {
      paymentTransactionItem.rollbackAttributes();
      this.sendAction('onCancelClicked');
    },
    addNewItem(name){
      var _this = this;
      let itemService = this.get('itemService');
      return itemService.add(name, true).then(function(data) {
        // on fulfillment
        Ember.set(_this, 'paymentTransactionItem.item', data.item);
        _this.get('appManager').notify('success', data.message);
      }, function(reason) {
        // on rejection
        _this.get('appManager').notify('error', "Item could not be added:" +reason);
      });
    },
    search(key){
      return this.get('allItems').filter(function(item){
        let value = item.get('name');
        // let isLabor = item.get('isLabor');
        return value.toLowerCase().includes(key.toLowerCase());
        // return value.includes(key);
      });
    }
  }
});
