import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  company: Ember.inject.service(),
  actions: {
    doSignIn(email, password){
      var _this = this;
      var credentials = {'identification':email, 'password': password};
      var authenticator = 'authenticator:token';
      this.get('session').authenticate(authenticator, credentials)
      .then(function(data){
        alert('authenticated'+data);
        var userId = _this.get('session.data.authenticated.user.id');
        _this.get('company').checkUserAccess(_this.get('model.companyAcronym'), userId)
        .then(function() {
          // on fulfillment
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
