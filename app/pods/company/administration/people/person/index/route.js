import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function (params) {
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
