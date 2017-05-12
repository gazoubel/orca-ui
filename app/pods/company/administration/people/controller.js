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
        var person = controller.store.createRecord('person', {
          firstName: name,
          lastName: name,
          company: company
        });

        if (!person.get('validations.isValid')) {
          controller.set('modelIsInValid', true);
          controller.get('appManager').notify('error', person.get('validations.messages'));
          person.rollbackAttributes();
          return;
        }

        person.save().then(function() {
          controller.set('modelIsInValid', false);
          controller.set('name', '');

          // var company_id = controller.get('session.sessionVariables.company_id');
          // controller.set('model', controller.get('store').query('person', {company: company_id}));
          controller.send('refreshModel');

          var t_model = controller.get('intl').t('models.person');
          var message = controller.get('intl').t('product.messages.model_created',{model: t_model});
          controller.get('appManager').notify('success', message);
        }).catch(function(error){
          controller.set('modelIsInValid', true);
          controller.get('appManager').notify('error', error.detailedMessage);
          person.rollbackAttributes();
        });
      });

    },
    remove: function (person){
      person.destroyRecord();
    }
  }
});
