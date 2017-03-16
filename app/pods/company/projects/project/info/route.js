import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.modelFor('company.projects.project');
  },
  setupController: function(controller, model) {
    controller.set('project', model);
  },
});
