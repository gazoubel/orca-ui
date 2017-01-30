import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  actions: {
    doSignIn(email, password){
      var _this = this;
      var credentials = {'identification':email, 'password': password};
      var authenticator = 'authenticator:token';
      this.get('session').authenticate(authenticator, credentials)
      .then(function(data){
        alert('authenticated');
      }).catch(function(reason){
        alert('failed:'+reason);
      });
    }
  }
});
