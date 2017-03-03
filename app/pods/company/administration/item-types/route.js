import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function () {
    var company_id = this.get('session.sessionVariables.company_id');
    // return this.store.findAll('item-type', {company: company_id});
  },
  setupController: function(controller, model) {
    controller.set('modelIsInValid', false);
    controller.set('newItemType', {name: '', isLabor: false});
    controller.set('model', model);
  }
});