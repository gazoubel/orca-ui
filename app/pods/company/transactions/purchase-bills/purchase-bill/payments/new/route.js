import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var company = this.modelFor('company');
    var purchaseBill = this.modelFor('company.transactions.purchase-bills.purchase-bill');
    return Ember.RSVP.hash({
      allPaymentTypes: company.get('paymentTypes'),
      purchaseBill: purchaseBill
    });
  },
  setupController: function(controller, models) {
    controller.set('purchaseBill', models.purchaseBill);
    controller.set('allPaymentTypes', models.allPaymentTypes);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.paymentTransaction');
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions.purchase-bills.purchase-bill');
    },
    canceled(){
      this.transitionTo('company.transactions.purchase-bills.purchase-bill');
    },
    willTransition(transition) {
      var paymentTransaction = this.controller.get('purchaseBill');
      if (paymentTransaction.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        paymentTransaction.rollbackAttributes();
        return true;
      }
    }
  }
});
