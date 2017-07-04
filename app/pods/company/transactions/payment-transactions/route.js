import Ember from 'ember';

export default Ember.Route.extend({
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
