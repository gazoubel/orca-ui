import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var ref = this;
    var company = this.modelFor('company');
    var purchaseTransaction = this.modelFor('company.transactions.purchase-transactions.purchase-transaction');
    // var person = this.get('session.sessionVariables.person');
    var totalLeftToPay = purchaseTransaction.get('totalLeftToPay');
    // var paymentTransaction = ref.store.createRecord('payment-transaction', {
    //   company: company,
    //   purchaseTransaction: purchaseTransaction,
    //   paidByPerson: person,
    //   paymentType: purchaseTransaction.get('paymentType'),
    //   total: totalLeftToPay
    // });
    return Ember.RSVP.hash({
      // paymentTransaction: paymentTransaction,
      allPaymentTypes: company.get('paymentTypes'),
      // maximumAllowed: totalLeftToPay,
      purchaseTransaction: purchaseTransaction
    });
  },
  setupController: function(controller, models) {
    controller.set('purchaseTransaction', models.purchaseTransaction);
    controller.set('allPaymentTypes', models.allPaymentTypes);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.paymentTransaction');
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions.purchase-transactions.purchase-transaction');
    },
    canceled(){
      this.transitionTo('company.transactions.purchase-transactions.purchase-transaction');
    },
    willTransition(transition) {
      var paymentTransaction = this.controller.get('paymentTransaction');
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
