import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    // console.log(this.get('router.url'));
    return this.get('store').findRecord('project', params.project_id);
  },
  setupController: function(controller, model) {
    controller.set('project', model);
    // console.log(this.get('router.url'));
  },
  actions: {
    didTransition() {
      Ember.run.once(this, function() {
        var controller = this.get('controller');
        var currentPath = Ember.getOwner(this).lookup('controller:application').currentPath;
        controller.set('currentPath',currentPath);
        // console.log(Ember.getOwner(this).lookup('controller:application').currentPath); 
      });
    }
  }

});
