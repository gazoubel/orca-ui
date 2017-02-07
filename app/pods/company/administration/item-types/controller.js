import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  modelIsInValid: false,
  actions: {
    closeAddPanel: function(){
      this.set('modelIsInValid', false);
      this.set('name', "");
    },

    add: function (name){
      var controller = this;
      var sessionVariables = this.get('session.sessionVariables');
      this.get('store').findRecord('company', sessionVariables.company_id).then(function(company){
        var itemType = controller.store.createRecord('item-type', {
          name: name,
          company: company
        });

        if (!itemType.get('validations.isValid')) {
          controller.set('modelIsInValid', true);
          controller.get('appManager').notify('error', provider.get('validations.messages'));
          itemType.rollbackAttributes();
          return;
        }

        itemType.save().then(function() {
          controller.set('modelIsInValid', false);
          controller.set('name', '');
          var t_model = controller.get('intl').t('models.itemtype');
          var message = controller.get('intl').t('product.messages.model_created',{model: t_model});
          controller.get('appManager').notify('success', message);
        }).catch(function(error){
          controller.set('modelIsInValid', true);
          controller.get('appManager').notify('error', error.detailedMessage);
          itemType.rollbackAttributes();
        });
      });

    },
    removeStage: function (itemType){
      itemType.destroyRecord();
    }
  }
});
