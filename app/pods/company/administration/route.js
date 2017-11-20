import Ember from 'ember';

export default Ember.Route.extend({
  company: Ember.inject.service(),
  beforeModel(){
    var ref = this;
    return this.get('company').checkUserAccessFor("displayAdminTab").then(function(hasAccess){
      if (!hasAccess) {
        ref.transitionTo('company');
      }
    });
  }
});
