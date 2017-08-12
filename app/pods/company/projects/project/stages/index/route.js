import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    // var project = this.modelFor('company.projects.project');
    return this.modelFor('company.projects.project').reload().then(function(project){
      return project.get('projectStages');
    });
  },
  setupController: function(controller, model) {
    controller.set('projectStages', model);
  },
  actions:{
    start(projectStage){
      projectStage.set('startedOn', new Date());
      projectStage.save();
      return false;
    },
    finish(projectStage){
      projectStage.set('finishedOn', new Date());
      projectStage.save();
      return false;
    }
  }
});
