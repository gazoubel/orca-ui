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

    add: function (name){
      var controller = this;
      var sessionVariables = this.get('session.sessionVariables');
      this.get('store').findRecord('company', sessionVariables.company_id).then(function(company){
        var provider = controller.store.createRecord('provider', {
          name: name,
          company: company
        });

        controller.set('modelIsInValid', false);
        if (!provider.get('validations.isValid')) {
          controller.set('modelIsInValid', true);
          controller.get('appManager').notify('error', provider.get('validations.messages'));
          provider.rollbackAttributes();
          return;
        }

        provider.save().then(function() {
            controller.set('name', '');
            controller.get('appManager').notify('success', "Provider Created");
        }).catch(function(reason){
          controller.get('appManager').notify('error', "Error creating provider:" + reason);
        });
      });

    },
    removeStage: function (provider){
      provider.destroyRecord();
    }
  }
});
