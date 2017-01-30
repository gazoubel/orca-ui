import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  model: function () {
    return Ember.RSVP.hash({
      companyModel: this.modelFor('company')
      // intl: this.get('intl').setLocale(config.APP.language),
    });
  }
});
