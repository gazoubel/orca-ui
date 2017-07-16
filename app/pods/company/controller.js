import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  company: Ember.inject.service(),
  // store: Ember.inject.service(),
  actions: {
    // doSignIn(email, password){
    //   var _this = this;
    //   var credentials = {'identification':email, 'password': password};
    //   var authenticator = 'authenticator:token';
    //   this.get('session').authenticate(authenticator, credentials)
    //   .then(function(){
    //     _this.get('appManager').notify('info', 'authenticated');
    //     // alert('authenticated'+data);
    //     var userId = _this.get('session.data.authenticated.user.id');
    //     _this.get('company').checkUserAccess(_this.get('model.companyAcronym'), userId)
    //     .then(function() {
    //       // on fulfillment
    //       var company_id = _this.get('session.sessionVariables.company_id');
    //       // var company = _this.get('store').findRecord('company', company_id, { reload: true });
    //       // _this.set('model', company);
    //       return _this.get('store').findRecord('company', company_id, { reload: true }).then(function(company){
    //         _this.set('model', company);
    //       });
    //       // return;
    //     }, function() {
    //       _this.set('session.attemptedTransition', null);
    //       _this.get('session').invalidate();
    //     });
    //   }).catch(function(reason){
    //     alert('failed:'+reason);
    //   });
    // }
  }
});
