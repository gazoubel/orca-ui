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
        var provider = controller.store.createRecord('provider', {
          name: name,
          company: company
        });

        if (!provider.get('validations.isValid')) {
          controller.set('modelIsInValid', true);
          controller.get('appManager').notify('error', provider.get('validations.messages'));
          provider.rollbackAttributes();
          return;
        }

        provider.save().then(function() {
          // controller.send('refreshModel');
          controller.set('modelIsInValid', false);
          controller.set('name', '');
          var t_model = controller.get('intl').t('models.provider');
          var message = controller.get('intl').t('product.messages.model_created',{model: t_model});
          controller.get('appManager').notify('success', message);
        }).catch(function(error){
          controller.set('modelIsInValid', true);
          controller.get('appManager').notify('error', error.detailedMessage);
          provider.rollbackAttributes();
        });
      });

    },
    removeStage: function (provider){
      provider.destroyRecord();
    }
  }
});
