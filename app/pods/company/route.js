import Ember from 'ember';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
// import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend({
  company: Ember.inject.service(),
  session: Ember.inject.service('session'),
  beforeModel: function(transition) {
    // this.get('session').invalidate();
    var _this = this;
    var session = _this.get('session');
    if (session.get('isAuthenticated')) {
      var userId = session.get('data.authenticated.user.id');
      var currentAcronym = transition.params.company.company_acronym;
      return _this.get('company')
      .checkUserAccess(currentAcronym, userId)
      .then(function() {
        // on fulfillment
      }, function(reason) {
        alert('user access denied:'+reason);
        _this.set('session.attemptedTransition', null);
        _this.get('session').invalidate();
      });
    }
  },
  model: function (params) {
    return Ember.RSVP.hash({
      companyAcronym: params.company_acronym
      // intl: this.get('intl').setLocale(config.APP.language),
    });
  },
  actions:{
      doSignOut(){
        this.get('session').invalidate().then(function(){
        });
      }
  }
});
