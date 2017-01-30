import Ember from 'ember';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
// import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend({
  model: function (params) {
    return Ember.RSVP.hash({
      companyName: params.company_acronym
      // intl: this.get('intl').setLocale(config.APP.language),
    });
  }
});
