import Ember from 'ember';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  company: Ember.inject.service(),
  beforeModel: function(transition) {
    var _this = this;
    var session = _this.get('session');
    if (session.get('isAuthenticated')) {
      var userId = session.get('data.authenticated.user.id');
      var currentAcronym = transition.params.company.company_acronym;
      _this.get('company')
      .checkUserAccess(currentAcronym, userId)
      .then(function(value) {
        // on fulfillment
      }, function(reason) {
        _this.set('session.attemptedTransition', null);
        _this.get('session').invalidate();
      });
    }
  },
  actions:{
      doSignOut(){
        var _this = this;
        this.get('session').invalidate().then(function(){
          // _this.transitionToRoute('company');
        });
      }
  }
});
