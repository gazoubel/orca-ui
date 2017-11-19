import Ember from 'ember';

export default Ember.Route.extend({
  // session: Ember.inject.service('session'),
  intl: Ember.inject.service(),

  model: function () {
    return this.modelFor('company.administration.privileges.privilege');

  },
  setupController: function(controller, model) {
    controller.set('privilege', model);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.privilege');
      var message = this.get('intl').t('product.messages.model_updated',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.administration.privileges');
      return false;
    },
    canceled(){
      this.transitionTo('company.administration.privileges');
    },
    willTransition(transition) {
      var privilege = this.controller.get('privilege');
      if (privilege.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        privilege.rollbackAttributes();
        return true;
      }
    }
  }
});
