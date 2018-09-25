import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model: function (params) {
    var project = this.modelFor('company.projects.project');
    var projectStages = project.get('projectStages');

    return projectStages.then(function(projectStages){
      return projectStages.filter(function(projectStage){
        return projectStage.get('id')===params.stage_id;
      });
    }).then(function(results){
      if(!results || results.length===0){
        RSVP.reject("Stage not found in this projects.");
      } else {
        return Ember.RSVP.hash({
          projectStages:projectStages,
          projectStage:results[0]
        });
      }
    });


  },
  setupController: function(controller, model) {
    // controller.set('projectStages', model.projectStages);
    controller.set('projectStage', model.projectStage);
  },
});
