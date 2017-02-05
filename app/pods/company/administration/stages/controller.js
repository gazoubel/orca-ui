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
      this.get('store').findRecord('company', sessionVariables.company_id).then(function(company){
        var stage = controller.store.createRecord('stage', {
          name: name,
          company: company
        });

        controller.set('modelIsInValid', false);
        if (!stage.get('validations.isValid')) {
          controller.set('modelIsInValid', true);
          controller.get('appManager').notify('error', stage.get('validations.messages'));
          stage.rollbackAttributes();
          return;
        }

        stage.save().then(function() {
            controller.set('name', '');
            controller.get('appManager').notify('success', "Stage Created");
        }).catch(function(reason){
          controller.get('appManager').notify('error', "Error creating stage:" + reason);
        });
      });

    },
    removeStage: function (stage){
      stage.destroyRecord();
    }
  }
});
