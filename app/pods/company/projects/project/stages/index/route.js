import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    var project = this.modelFor('company.projects.project');
    return project.get('projectStages');
  },
  setupController: function(controller, model) {
    controller.set('projectStages', model);
  },
});
