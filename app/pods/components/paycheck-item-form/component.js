import Ember from 'ember';

export default Ember.Component.extend({
  laborItemService: Ember.inject.service(),
  paycheckItem: null,
  allProjects: null,
  allLaborItems: null,
  selectedProject: null,
  didReceiveAttrs() {
    this._super(...arguments);
    const project = this.get('paycheckItem.projectStage.project');
    this.set('selectedProject', project);
  },
  actions: {
    save(paycheckItem) {
      var _ref = this;

      if (!paycheckItem.get('validations.isValid')) {
        _ref.get('appManager').notify('error', paycheckItem.get('validations.messages'));
        return;
      }
      return paycheckItem.save().then(function(){
        _ref.sendAction('onSaveClicked', paycheckItem);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(paycheckItem) {
      paycheckItem.rollbackAttributes();
      this.sendAction('onCancelClicked');
    },
    addNewItem(name){
      var _this = this;
      let laborItemService = this.get('laborItemService');
      return laborItemService.add(name).then(function(data) {
        // on fulfillment
        Ember.set(_this, 'paycheckItem.laborItem', data.item);
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
