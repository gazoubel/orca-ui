import Ember from 'ember';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
// import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  beforeModel: function(transition) {
    var _this = this;
    var session = _this.get('session');
    if (session.get('isAuthenticated')) {
      var userId = session.get('data.authenticated.user.id');
      var currentAcronym = transition.params.company.company_acronym;

      var promise = new Promise(function(resolve, reject) {
        _this.get('store').query('company', {acronym: currentAcronym})
        .then(function(companies){
          var company = companies.get('firstObject');
          if(company && company.get('id')){
            _this.get('store').findAll('company-to-user', {user: userId, company: company.get('id')})
            .then(function(record) {
                if(record.get('length')>0){
                  session.set('name', 'Fulano dos Grudes');
                  resolve(true);
                } else {
                  reject('user does not have access to this company');
                }
            });
          } else {
            reject('company does not exist');
          }

        })
      });

      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        _this.set('session.attemptedTransition', null);
        _this.get('session').invalidate();
      });


      // _this.get('store').queryRecord('company', {acronym: currentAcronym})
      // .then(function(company){
      //     _this.get('store').findAll('company-to-user', {user: userId, company: company.id})
      //     .then(function(record) {
      //         if(record.get('length')>0){
      //           alert('found');
      //         } else {
      //           alert('not found');
      //         }
      //     });
      // })
    }
  },
  // beforeModel: function(transition) {
  //   if (!this.get('session.isAuthenticated')) {
  //     this.set('session.attemptedTransition', transition);
  //   }
  // },
  model: function (params) {
    return Ember.RSVP.hash({
      companyName: params.company_acronym
      // intl: this.get('intl').setLocale(config.APP.language),
    });
  }
  ,
  // actions: {
  //   doSignOut(){
  //     this.get('session').invalidate();
  //   },
  //   doSignIn(email, password){
  //     var _this = this;
  //     var credentials = {'identification':email, 'password': password};
  //     var authenticator = 'authenticator:token';
  //     this.get('session').authenticate(authenticator, credentials)
  //     .then(function(data){
  //       alert('authenticated');
  //     }).catch(function(reason){
  //       alert('failed:'+reason);
  //     });
  //   }
  // }
});
