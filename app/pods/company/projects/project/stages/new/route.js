import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var ref = this;
    var project = this.modelFor('company.projects.project');
    let company = this.modelFor('company');
    var projectStage = project.get('projectStages').then(function(projectStages){
      return projectStages.filter(function(item){
        return item.get('isLastItem')===true;
      });
    }).then(function(records){
      var lastProjectStage=null;
      if(records.get('length')>0){
        lastProjectStage = records.get('firstObject');
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

    return Ember.RSVP.hash({
      projectStage: projectStage,
      stages: company.get('stages')
    });

    // var company_id = this.get('session.sessionVariables.company_id');
    // return ref.get('store').findRecord('company', company_id)
    // .then(function(company){
    //   var projectStage = project.get('projectStages').then(function(projectStages){
    //     return projectStages.filter(function(item){
    //       return item.get('isLastItem')===true;
    //     });
    //   }).then(function(records){
    //     var lastProjectStage=null;
    //     if(records.get('length')>0){
    //       lastProjectStage = records.get('firstObject');
    //       if (lastProjectStage==null || !lastProjectStage.get('id')) {
    //         lastProjectStage=null;
    //       }
    //     }
    //     return lastProjectStage;
    //   }).then(function (lastProjectStage) {
    //     var projectStage = ref.store.createRecord('project-stage', {
    //       project: project,
    //       previous: lastProjectStage
    //     });
    //     return projectStage;
    //   });
    //
    //   return Ember.RSVP.hash({
    //     projectStage: projectStage,
    //     stages: company.get('stages')
    //   });
    // });


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
    controller.set('projectStage', model.projectStage);
    controller.set('stages', model.stages);
  },

  actions: {
    added(){
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
