import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return Ember.RSVP.hash({
      company: this.modelFor('company'),
      project: this.modelFor('company.projects.project'),
    });
    // return this.modelFor('company.projects.project').reload().then(function(project){
    //   return project;
    // });
  },
  setupController: function(controller, model) {
    controller.set('company', model.company);
    controller.set('project', model.project);
    // controller.set('availableTeamMembers', []);
    controller.set('selectedMember', {});
  }
});
