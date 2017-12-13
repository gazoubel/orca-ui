import Ember from 'ember';

export default Ember.Component.extend({
  itemService: Ember.inject.service(),
  purchaseBillItem: null,
  allProjects: null,
  allItems: null,
  selectedProject: null,
  didReceiveAttrs() {
    this._super(...arguments);
    const project = this.get('purchaseBillItem.projectStage.project');
    this.set('selectedProject', project);
  },
  actions: {
    save(purchaseBillItem) {
      var _ref = this;

      if (!purchaseBillItem.get('validations.isValid')) {
        _ref.get('appManager').notify('error', purchaseBillItem.get('validations.messages'));
        return;
      }
      return purchaseBillItem.save().then(function(){
        _ref.sendAction('onSaveClicked', purchaseBillItem);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(purchaseBillItem) {
      purchaseBillItem.rollbackAttributes();
      this.sendAction('onCancelClicked');
    },
    addNewItem(name){
      var _this = this;
      let itemService = this.get('itemService');
      return itemService.add(name).then(function(data) {
        // on fulfillment
        Ember.set(_this, 'purchaseBillItem.item', data.item);
        _this.get('appManager').notify('success', data.message);
      }, function(reason) {
        // on rejection
        _this.get('appManager').notify('error', "Item could not be added:" +reason);
      });
    },
    search(key){
      return this.get('allItems').filter(function(item){
        let value = item.get('name');
        return value.toLowerCase().includes(key.toLowerCase());
      });
    }
  }
});
