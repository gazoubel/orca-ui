import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    // var ref = this;
    var company = this.modelFor('company');

    var privilege_id = params.privilege_id;
    if (!privilege_id) {
      Ember.RSVP.reject("Privilege is invalid.");
    }

    return this.store.queryRecord('privilege', {id: privilege_id, company: company.get('id')}).then(function(privilege){
      if(privilege){
        return privilege;
      }
      Ember.RSVP.reject("Privilege does not belong to this company.");
    });
  }
});
