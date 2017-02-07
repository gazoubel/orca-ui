import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function () {
    var company_id = this.get('session.sessionVariables.company_id');
    return this.store.findAll('payment-type', {company: company_id});
  },
});
