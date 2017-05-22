import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function () {
    var company_id = this.get('session.sessionVariables.company_id');
    return this.store.query('item-type', {company: company_id});
  },
  setupController: function(controller, model) {
    controller.set('modelIsInValid', false);
    controller.set('newItemType', {name: ''});
    controller.set('model', model);
  }
});
