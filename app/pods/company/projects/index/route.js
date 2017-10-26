import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function () {
    let company = this.modelFor('company');
    // return this.modelFor('company').then(function(company){
    return company.reload().then(function(){
      return company.get('projects');
    });
    // });
    // let company = this.modelFor('company');
    // company.reload();
    // return company.get('projects');

    // var company_id = this.get('session.sessionVariables.company_id');
    // return this.store.query('project', {company: company_id});
  },
  setupController: function(controller, model) {
    controller.set('projects', model);
  },
  actions: {
    closeProject(project){
      project.set('isArchived', true);
      return project.save();
    }
  }
});
