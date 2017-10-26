import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function (params) {
    var company_id = this.get('session.sessionVariables.company_id');
    return this.get('store').findRecord('person', params.person_id).then(function(person){
      return person.get('company').then(function(company){
          var companyId = company.get('id');
          if(companyId===company_id)
          {
            return person;
          }
          RSVP.reject("Person does not belong to this company.");
      });
    });
  },
  setupController: function(controller, model) {
    controller.set('person', model);
  },
});
