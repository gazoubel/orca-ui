import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service('session'),
  intl: service(),
  modelIsInValid: false,
  basicTypes: [{name: 'fields.basicTypes.material', value: 'material'}, {name: 'fields.basicTypes.labor', value: 'labor'}],
  newItemType: {name: '', basicType: null},
  actions: {
    closeAddPanel: function(){
      this.set('modelIsInValid', false);
      // this.set('name', "");
      this.set('newItemType', {name: '', isLabor: false});
    },

    add: function (newItemType){
      // var newItemType = itemType;
      var controller = this;
      var company = this.get('company');
      // var company = this.get('session.sessionVariables.person.company');
      // var sessionVariables = this.get('session.sessionVariables');
      // this.get('store').findRecord('company', sessionVariables.company_id).then(function(company){
      var itemType = controller.store.createRecord('item-type', {
        name: newItemType.name,
        // basicType: newItemType.basicType.value,
        isLabor: newItemType.isLabor,
        company: company
      });

      if (!itemType.get('validations.isValid')) {
        controller.set('modelIsInValid', true);
        controller.get('appManager').notify('error', itemType.get('validations.messages'));
        newItemType.rollbackAttributes();
        return;
      }

      itemType.save().then(function() {
        controller.set('modelIsInValid', false);
        controller.set('newItemType', {name: '', isLabor: false});
        var t_model = controller.get('intl').t('models.itemtype');
        var message = controller.get('intl').t('product.messages.model_created',{model: t_model});
        controller.get('appManager').notify('success', message);
      }).catch(function(error){
        controller.set('modelIsInValid', true);
        controller.get('appManager').notify('error', error.detailedMessage);
        itemType.rollbackAttributes();
      });
      // });

    },
    removeStage: function (itemType){
      itemType.destroyRecord();
    }
  }
});
