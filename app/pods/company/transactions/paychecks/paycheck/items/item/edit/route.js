import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    // var company_id = this.get('session.sessionVariables.company_id');
    // var paycheck = this.modelFor('company.transactions.paychecks.paycheck');
    let company = this.modelFor('company');

    return Ember.RSVP.hash({
      paycheckItem: this.modelFor('company.transactions.paychecks.paycheck.items.item'),
      allProjects: company.get('projects'),
      allLaborItems: company.get('laborItems')
    });

  },
  setupController: function(controller, models) {
    controller.set('paycheckItem', models.paycheckItem);
    controller.set('allProjects', models.allProjects);
    controller.set('allLaborItems', models.allLaborItems);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.paycheckItem');
      var message = this.get('intl').t('product.messages.model_updated',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions.paychecks.paycheck');
    },
    canceled(){
      this.transitionTo('company.transactions.paychecks.paycheck');
    },
    willTransition(transition) {
      var paycheckItem = this.controller.get('paycheckItem');
      if (paycheckItem.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        paycheckItem.rollbackAttributes();
        return true;
      }
    }
  }
});
