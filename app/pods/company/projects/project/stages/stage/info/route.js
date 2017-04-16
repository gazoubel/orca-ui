import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    var stageModel = this.modelFor('company.projects.project.stages.stage');
    return stageModel.projectStage;
  },
  setupController: function(controller, model) {
    controller.set('projectStage', model);
  },
});
