import Ember from 'ember';

export default Ember.Component.extend({
  laborItemService: Ember.inject.service(),
  laborTransactionItem: null,
  allProjects: null,
  allLaborItems: null,
  selectedProject: null,
  didReceiveAttrs() {
    this._super(...arguments);
    const project = this.get('laborTransactionItem.projectStage.project');
    this.set('selectedProject', project);
  },
  actions: {
    save(laborTransactionItem) {
      var _ref = this;

      if (!laborTransactionItem.get('validations.isValid')) {
        _ref.get('appManager').notify('error', laborTransactionItem.get('validations.messages'));
        return;
      }
      return laborTransactionItem.save().then(function(){
        _ref.sendAction('onSaveClicked', laborTransactionItem);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(laborTransactionItem) {
      laborTransactionItem.rollbackAttributes();
      this.sendAction('onCancelClicked');
    },
    addNewItem(name){
      var _this = this;
      let laborItemService = this.get('laborItemService');
      return laborItemService.add(name).then(function(data) {
        // on fulfillment
        Ember.set(_this, 'laborTransactionItem.laborItem', data.item);
        _this.get('appManager').notify('success', data.message);
      }, function(reason) {
        // on rejection
        _this.get('appManager').notify('error', "Item could not be added:" +reason);
      });
    },
    search(key){
      return this.get('allLaborItems').filter(function(item){
        let value = item.get('name');
        // let isLabor = item.get('isLabor');
        return value.toLowerCase().includes(key.toLowerCase());
        // return value.includes(key);
      });
    }
  }
});
