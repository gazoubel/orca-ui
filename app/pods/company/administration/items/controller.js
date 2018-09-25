import Ember from 'ember';

export default Ember.Controller.extend({
  // session: Ember.inject.service('session'),
  // intl: Ember.inject.service(),
  itemService: Ember.inject.service(),
  modelIsInValid: false,
  actions: {
    closeAddPanel: function(){
      this.set('modelIsInValid', false);
      this.set('name', "");
    },
    add: function(name){
      var controller = this;
      let itemService = this.get('itemService');
      return itemService.add(name).then(function(data) {
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
      return this.get('itemService').remove(item);
    }
    // add: function (name){
    //   var controller = this;
    //   var sessionVariables = this.get('session.sessionVariables');
    //   return this.get('store').findRecord('company', sessionVariables.company_id).then(function(company){
    //     var item = controller.store.createRecord('item', {
    //       name: name,
    //       company: company
    //     });
    //
    //     if (!item.get('validations.isValid')) {
    //       controller.set('modelIsInValid', true);
    //       controller.get('appManager').notify('error', item.get('validations.messages'));
    //       item.rollbackAttributes();
    //       return;
    //     }
    //
    //     item.save().then(function() {
    //         controller.set('modelIsInValid', false);
    //         controller.set('name', '');
    //
    //         var t_model = controller.get('intl').t('models.item');
    //         var message = controller.get('intl').t('product.messages.model_created',{model: t_model});
    //         controller.get('appManager').notify('success', message);
    //     }, function(error){
    //       controller.set('modelIsInValid', true);
    //       controller.get('appManager').notify('error', error.detailedMessage);
    //       item.rollbackAttributes();
    //     }).catch(function(reason){
    //       item.rollbackAttributes();
    //       controller.get('appManager').notify('error', "Error creating stage:" + reason);
    //     });
    //   });
    //
    // },
    // remove: function (item){
    //   item.destroyRecord();
    // }
  }
});
