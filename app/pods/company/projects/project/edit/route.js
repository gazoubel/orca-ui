import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var ref = this;
    return this.modelFor('company').reload().then(function(company){
      return Ember.RSVP.hash({
        project: ref.modelFor('company.projects.project'),
        availableProjectAssignees: company.get('people')
      });
    });
    // return this.modelFor('company.projects.project');

  },
  setupController: function(controller, model) {
    controller.set('project', model.project);
    controller.set('availableProjectAssignees', model.availableProjectAssignees);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.project');
      var message = this.get('intl').t('product.messages.model_updated',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.projects.project.info');
    },
    canceled(){
      this.transitionTo('company.projects.project.info');
    },
    willTransition(transition) {
      var project = this.controller.get('project');
      if (project.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        project.rollbackAttributes();
        return true;
      }
    }
  }
});
