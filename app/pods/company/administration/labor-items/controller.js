import Ember from 'ember';

export default Ember.Controller.extend({
  // session: Ember.inject.service('session'),
  // intl: Ember.inject.service(),
  laborItemService: Ember.inject.service(),
  modelIsInValid: false,
  actions: {
    closeAddPanel: function(){
      this.set('modelIsInValid', false);
      this.set('name', "");
    },
    add: function(name){
      var controller = this;
      let laborItemService = this.get('laborItemService');
      return laborItemService.add(name).then(function(data) {
        // on fulfillment
        controller.set('modelIsInValid', false);
        controller.set('name', '');
        controller.get('appManager').notify('success', data.message);
      }, function(reason) {
        // on rejection
        controller.get('appManager').notify('error', reason);
      });
    },
    remove: function(item){
      return this.get('laborItemService').remove(item);
    }
  }
});
