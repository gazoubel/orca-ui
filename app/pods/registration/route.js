import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  beforeModel: function() {
    var session = this.get('session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
  }
});
