import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function () {
    // var company_id = this.get('session.sessionVariables.company_id');
    // return this.store.query('stage', {company: company_id});
    let company = this.modelFor('company');
    company.reload();
    return company;
    // return this.modelFor('company').reload();
  },
  setupController: function(controller, model) {
    controller.set('modelIsInValid', false);
    controller.set('name', "");
    controller.set('stages', model.get('stages'));
    controller.set('company', model);
  }
});
