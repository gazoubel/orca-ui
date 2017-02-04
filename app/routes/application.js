import Ember from 'ember';
// import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
export default Ember.Route.extend({
  intl: Ember.inject.service(),
    beforeModel() {
      return this.get('intl').setLocale('en-us');
    }
});
