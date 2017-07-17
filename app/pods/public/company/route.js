import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  company: Ember.inject.service(),
  // store: Ember.inject.service(),
  model: function (params) {
    return Ember.RSVP.hash({
      companyAcronym: params.company_acronym
    });
  },
  setupController: function(controller, model) {
    controller.set('companyAcronym', model.companyAcronym);
    controller.set('email', '');
    controller.set('password', '');
  },
  actions: {
    doSignIn(email, password){
      var _this = this;
      var credentials = {'identification':email, 'password': password};
      var authenticator = 'authenticator:token';
      this.get('session').authenticate(authenticator, credentials)
      .then(function(){
        _this.get('appManager').notify('info', 'authenticated');
        // alert('authenticated'+data);
        var userId = _this.get('session.data.authenticated.user.id');
        var acronym = _this.currentModel.companyAcronym;
        _this.get('company').checkUserAccess(acronym, userId)
        .then(function() {
          // on fulfillment
          _this.transitionTo('company', acronym);
        }, function() {
          _this.set('session.attemptedTransition', null);
          _this.get('session').invalidate();
        });
      }).catch(function(reason){
        alert('failed:'+reason);
      });
    }
  }
});
