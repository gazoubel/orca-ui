import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function (params) {
    // console.log(this.get('router.url'));
    var company_id = this.get('session.sessionVariables.company_id');
    // return this.get('store').findRecord('company', company_id)
    // .then(function(company){
    //   return company.get('projects').then(function(projects){
    //     return projects.filter(function(project){
    //       return project.get('id')===params.project_id;
    //     });
    //   }).then(function(records){
    //     if (records.get('length') > 0)
    //       return records.get('firstObject');
    //     else
    //       RSVP.reject("Project does not belong to this company.");
    //
    //   });
    // });

    return this.get('store').findRecord('project', params.project_id).then(function(project){
      return project.get('company').then(function(company){
          var projectCompanyId = company.get('id');
          if(projectCompanyId===company_id)
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
