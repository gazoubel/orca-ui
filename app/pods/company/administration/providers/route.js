import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function () {
    //session.session.content.authenticated.user
    var company_id = this.get('session.sessionVariables.company_id');
    return this.store.findAll('provider', {company: company_id});
  },
});
