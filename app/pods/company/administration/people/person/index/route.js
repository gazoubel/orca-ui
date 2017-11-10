import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function (params) {
    // var company_id = this.get('session.sessionVariables.company_id');
    // return this.get('store').findRecord('person', params.person_id).then(function(person){
    //   return person.get('company').then(function(company){
    //       var companyId = company.get('id');
    //       if(companyId===company_id)
    //       {
    //         return person;
    //       }
    //       Ember.RSVP.reject("Person does not belong to this company.");
    //   });
    // });
    return this.modelFor('company.administration.people.person').reload();
  },
  setupController: function(controller, model) {
    controller.set('person', model);
  },
  actions: {

    activate(person, isActive){
      var _ref = this;
      person.set('isActive', isActive);
      return person.save().then(function(){
        var message;
        if (isActive) {
          message = _ref.get('intl').t('product.administration.people.person.person_is_active');
        }else {
          message = _ref.get('intl').t('product.administration.people.person.person_is_inactive');
        }
        _ref.get('appManager').notify('success', message);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    // added(){
    //   var t_model = this.get('intl').t('models.person');
    //   var message = this.get('intl').t('product.messages.model_updated',{model: t_model});
    //   this.get('appManager').notify('success', message);
    //   // this.transitionTo('company.projects');
    //   return false;
    // },
    // canceled(){
    //   this.get('appManager').notify('success', this.get('intl').t('product.administration.people.person.information_rolledback'));
    //   // this.transitionTo('company.projects');
    // },
    willTransition(transition) {
      var person = this.controller.get('person');
      if (person.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        person.rollbackAttributes();
        return true;
      }
    }
  }
});
