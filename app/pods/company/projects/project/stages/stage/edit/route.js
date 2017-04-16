import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var stageModel = this.modelFor('company.projects.project.stages.stage');
    return stageModel.projectStage;
  },
  setupController: function(controller, model) {
    controller.set('projectStage', model);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.projectStage');
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.projects.project.stages.stage.info');
    },
    canceled(){
      this.transitionTo('company.projects.project.stages.stage.info');
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
