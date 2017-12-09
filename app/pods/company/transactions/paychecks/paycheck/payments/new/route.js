import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var company = this.modelFor('company');
    var paycheck = this.modelFor('company.transactions.paychecks.paycheck');
    return Ember.RSVP.hash({
      allPaymentTypes: company.get('paymentTypes'),
      paycheck: paycheck
    });
  },
  setupController: function(controller, models) {
    controller.set('paycheck', models.paycheck);
    controller.set('allPaymentTypes', models.allPaymentTypes);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.paycheck');
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions.paychecks.paycheck');
    },
    canceled(){
      this.transitionTo('company.transactions.paychecks.paycheck');
    },
    willTransition(transition) {
      var paycheck = this.controller.get('paycheck');
      if (paycheck.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        paycheck.rollbackAttributes();
        return true;
      }
    }
  }
});
