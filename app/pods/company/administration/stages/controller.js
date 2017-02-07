import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  modelIsInValid: false,
  init: function () {
    this._super();
    this.set('modelIsInValid', false);
    this.set('name', "");
  },

  actions: {
    closeAddPanel: function(){
      this.set('modelIsInValid', false);
      this.set('name', "");
    },

    addStage: function (name){
      var controller = this;
      var sessionVariables = this.get('session.sessionVariables');
      return this.get('store').findRecord('company', sessionVariables.company_id).then(function(company){
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

        stage.save().then(function() {
            controller.set('modelIsInValid', false);
            controller.set('name', '');
            controller.get('appManager').notify('success', "Stage Created");
        }, function(error){
          controller.set('modelIsInValid', true);
          controller.get('appManager').notify('error', error.detailedMessage);
          stage.rollbackAttributes();
          // controller.get('appManager').notify('error', errors);
        }).catch(function(reason){
          stage.rollbackAttributes();
          controller.get('appManager').notify('error', "Error creating stage:" + reason);
        });
      });

    },
    removeStage: function (stage){
      stage.destroyRecord();
    }
  }
});
