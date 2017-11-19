import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function (params) {
    // var company_id = this.get('session.sessionVariables.company_id');

    let loggedCompany = this.modelFor('company');


    return this.get('store').findRecord('project', params.project_id).then(function(project){
      return project.get('company').then(function(company){
          var projectCompanyId = company.get('id');
          if(projectCompanyId===loggedCompany.get('id'))
          {
            return project;
          }
          RSVP.reject("Project does not belong to this company.");
      });
    });
  },
  setupController: function(controller, model) {
    controller.set('project', model);
    // console.log(this.get('router.url'));
  },
  actions: {
    didTransition() {
      Ember.run.once(this, function() {
        var controller = this.get('controller');
        var currentPath = Ember.getOwner(this).lookup('controller:application').currentPath;
        controller.set('currentPath',currentPath);
        // console.log(Ember.getOwner(this).lookup('controller:application').currentPath);
      });
    }
  }

});
