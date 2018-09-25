import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function () {
    // var company_id = this.get('session.sessionVariables.company_id');
    // return this.store.query('person', {company: company_id});
    return this.modelFor('company').reload();
  },
  setupController: function(controller, model) {
    controller.set('modelIsInValid', false);
    controller.set('newPerson', {});
    controller.set('people', model.get('people'));
    controller.set('showAll', false);
    controller.set('company', model);
  },
  actions:{
    refreshModel: function(){
      this.refresh();
    }
  }
});
