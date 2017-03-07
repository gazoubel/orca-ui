import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var ref = this;
    var project = this.modelFor('company.projects.project');

    return project.get('projectStages').then(function(projectStages){
      return projectStages.filter(function(item){
        return item.get('isLastItem')===true;
      })
    }).then(function(records){
      var lastProjectStage=null;
      if(records.get('length')>0){
        var lastProjectStage = records.get('firstObject');
        if (lastProjectStage==null || !lastProjectStage.get('id')) {
          lastProjectStage=null;
        }
      }
      return lastProjectStage;
    }).then(function (lastProjectStage) {
      var projectStage = ref.store.createRecord('project-stage', {
        project: project,
        previous: lastProjectStage
      });
      return projectStage;
    });
    // var lastProjectStage = null;
    // return this.store.findAll('project-stage', {next: null, project: project.get('id')})
    // .then(function(records) {
    //   if(records.get('length')>0){
    //     var lastProjectStage = records.get('firstObject');
    //     if (lastProjectStage==null || !lastProjectStage.get('id')) {
    //       lastProjectStage=null;
    //     }
    //   }
    //   return lastProjectStage;
    // }).then(function (lastProjectStage) {
    //   var projectStage = ref.store.createRecord('project-stage', {
    //     project: project,
    //     previous: lastProjectStage
    //   });
    //   return projectStage;
    // });

    // var projectStage = ref.store.createRecord('project-stage', {
    //   project: project
    // });
    // return projectStage;
  },
  setupController: function(controller, model) {
    controller.set('projectStage', model);
  },

  actions: {
    added(projectStage){
      // var lastProjectStage = null;
      // this.store.findAll('project-stage', {next: null, project: projectStage.get('project.id')})
      // .then(function(records) {
      //   if(records.get('length')>0){
      //     lastProjectStage = records.get('firstObject');
      //   }
      //   return lastProjectStage;
      // }).then(function (lastProjectStage) {
      //   if (lastProjectStage!=null && lastProjectStage.get('id')) {
      //     projectStage.set('previous', lastProjectStage);
      //     projectStage.save();
      //     // lastProjectStage.set('next', projectStage);
      //     // lastProjectStage.save();
      //   }
      // });
      var t_model = this.get('intl').t('models.project');
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.projects.project.stages');
    },
    canceled(){
      this.transitionTo('company.projects.project.stages');
    },
    willTransition(transition) {
      var projectStage = this.controller.get('projectStage');
      if (projectStage.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        projectStage.rollbackAttributes();
        return true;
      }
    }
  }
});
