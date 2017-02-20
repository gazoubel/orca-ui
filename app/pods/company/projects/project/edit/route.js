import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function (params) {
    return this.modelFor('company.projects.project');
    // return this.get('store').findRecord('project', params.project_id);
  },
  setupController: function(controller, model) {
    controller.set('project', model);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.project');
      var message = this.get('intl').t('product.messages.model_updated',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.projects.project');
    },
    canceled(){
      this.transitionTo('company.projects.project');
    }
  }
});
