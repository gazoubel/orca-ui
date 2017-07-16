import Ember from 'ember';
// import moment from 'ember-moment';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
// import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend({
  company: Ember.inject.service(),
  session: Ember.inject.service('session'),
  moment: Ember.inject.service(),

  beforeModel: function(transition) {
    var _this = this;
    var session = _this.get('session');

    if (session.get('isAuthenticated')) {
      var userId = session.get('data.authenticated.user.id');
      var currentAcronym = this.get('session.sessionVariables.company_acronym');
      // var currentAcronym = transition.params.company.company_acronym;
      return _this.get('company')
      .checkUserAccess(currentAcronym, userId)
      .then(function() {
        // on fulfillment
        _this.get('moment').changeLocale('en-US');
        _this.set('moment.defaultFormat', 'MM/DD/YYYY');
      }, function(reason) {
        alert('user access denied:'+reason);
        _this.set('session.attemptedTransition', null);
        _this.get('session').invalidate();
      });
    } else {
      // var publicModel = Ember.RSVP.hash({
      //   companyAcronym: currentAcronym
      // });
      var currentAcronym = transition.params.company.company_acronym;
      this.transitionTo('public.company', currentAcronym);
    }
  },
  model: function (params) {
    // var company_id = this.get('session.sessionVariables.company_id');
    // return this.get('store').findRecord('company', company_id, { reload: true });

    var session = this.get('session');
    if (session.get('isAuthenticated')) {
      var company_id = this.get('session.sessionVariables.company_id');
      return this.get('store').findRecord('company', company_id, { reload: true });
    } else {
      return Ember.RSVP.hash({
        companyAcronym: params.company_acronym
      });
    }

  },

  // setupController: function(controller, model) {
  //   controller.set('modelIsInValid', false);
  //   controller.set('newItemType', {name: ''});
  //   controller.set('model', model);
  // },
  actions:{
      doSignOut(){
        var self = this;
        var currentAcronym = this.get('session.sessionVariables.company_acronym');
        this.get('session').invalidate().then(function(){
          self.transitionTo('public.company', currentAcronym);
        });
      }
  }
});
