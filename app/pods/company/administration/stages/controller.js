import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  modelIsInValid: false,
  stages: null,
  company: null,
  actions: {
    closeAddPanel: function(){
      this.set('modelIsInValid', false);
      this.set('name', "");
    },

    addStage: function (name){
      var controller = this;
      // var sessionVariables = this.get('session.sessionVariables');
      // var company = this.modelFor('company');
      // return this.get('store').findRecord('company', sessionVariables.company_id).then(function(company){
      // return this.get('company').then(function(company){
        var company = this.get('company');
        var stage = controller.store.createRecord('stage', {
          name: name,
          company: company
        });

        if (!stage.get('validations.isValid')) {
          controller.set('modelIsInValid', true);
          controller.get('appManager').notify('error', stage.get('validations.messages'));
          stage.rollbackAttributes();
          return;
        }

        return stage.save().then(function() {
            controller.set('modelIsInValid', false);
            controller.set('name', '');
            controller.set('stages', company.get('stages'));
            var t_model = controller.get('intl').t('models.stage');
            var message = controller.get('intl').t('product.messages.model_created',{model: t_model});
            controller.get('appManager').notify('success', message);
        }, function(error){
          controller.set('modelIsInValid', true);
          controller.get('appManager').notify('error', error.detailedMessage);
          stage.rollbackAttributes();
        }).catch(function(reason){
          stage.rollbackAttributes();
          controller.get('appManager').notify('error', "Error creating stage:" + reason);
        });
      // });

    },
    removeStage: function (stage){
      stage.destroyRecord();
    }
  }
});
