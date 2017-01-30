import Ember from 'ember';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  actions:{
      doSignOut(){
        var _this = this;
        this.get('session').invalidate().then(function(){
          // _this.transitionToRoute('company');
        });
      }
  }
});
