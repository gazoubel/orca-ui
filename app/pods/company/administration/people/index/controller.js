import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  modelIsInValid: false,
  activePeople: Ember.computed.filterBy('people','isActive', true),
  people: {},
  newPerson:{},
  showAll: false,
  displayPeople: Ember.computed('showAll', 'people', 'people.@each.isActive', function(){
    var showAll = this.get('showAll');
    if (showAll) {
        return this.get('people');
    }
    return this.get('activePeople');
  }),
  actions: {
    closeAddPanel: function(){
      this.set('modelIsInValid', false);
      this.set('newPerson', {});
    },
    toggleShowAll(){
      var showAll = this.get('showAll');
      this.set('showAll', !showAll);
    },
    add: function (newPerson){
      // var controller = this;
      // var sessionVariables = this.get('session.sessionVariables');

      var controller = this;
      // var sessionVariables = this.get('session.sessionVariables');
      var company = this.get('company');
      // this.get('store').findRecord('company', sessionVariables.company_id).then(function(company){
        var createdPerson = controller.store.createRecord('person', {
          firstName: newPerson.firstName,
          lastName: newPerson.lastName,
          company: company,
          isActive: true
        });

        if (!createdPerson.get('validations.isValid')) {
          controller.set('modelIsInValid', true);
          controller.get('appManager').notify('error', createdPerson.get('validations.messages'));
          createdPerson.rollbackAttributes();
          return;
        }

        createdPerson.save().then(function() {
          controller.set('modelIsInValid', false);
          controller.set('newPerson', {});
          var t_model = controller.get('intl').t('models.person');
          var message = controller.get('intl').t('product.messages.model_created',{model: t_model});
          controller.get('appManager').notify('success', message);
        }, function(error){
          controller.get('appManager').notify('error', error.detailedMessage);
          createdPerson.rollbackAttributes();
        }).catch(function(reason){
          controller.get('appManager').notify('error', reason);
          createdPerson.rollbackAttributes();
        });
      // });

    },
    remove: function (person){
      person.destroyRecord();
    }
  }
});
