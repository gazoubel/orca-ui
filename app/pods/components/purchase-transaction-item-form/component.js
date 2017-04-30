import Ember from 'ember';

export default Ember.Component.extend({
  itemService: Ember.inject.service(),
  purchaseTransactionItem: null,
  allProjects: null,
  allItems: null,
  selectedProject: null,
  didReceiveAttrs() {
    this._super(...arguments);
    const project = this.get('purchaseTransactionItem.projectStage.project');
    this.set('selectedProject', project);
  },
  actions: {
    save(purchaseTransactionItem) {
      var _ref = this;

      if (!purchaseTransactionItem.get('validations.isValid')) {
        _ref.get('appManager').notify('error', purchaseTransactionItem.get('validations.messages'));
        return;
      }
      return purchaseTransactionItem.save().then(function(){
        _ref.sendAction('onSaveClicked', purchaseTransactionItem);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(purchaseTransactionItem) {
      purchaseTransactionItem.rollbackAttributes();
      this.sendAction('onCancelClicked');
    },
    addNewItem(name){
      var _this = this;
      let itemService = this.get('itemService');
      return itemService.add(name).then(function(data) {
        // on fulfillment
        Ember.set(_this, 'purchaseTransactionItem.item', data.item);
        _this.get('appManager').notify('success', data.message);
      }, function(reason) {
        // on rejection
        _this.get('appManager').notify('error', "Item could not be added:" +reason);
      });
    },
    search(key){
      return this.get('allItems').filter(function(item){
        let value = item.get('name');
        return value.includes(key);
      });
    }
  }
});
