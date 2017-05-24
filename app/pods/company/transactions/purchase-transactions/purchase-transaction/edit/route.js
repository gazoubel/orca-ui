import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var ref = this;
    return this.modelFor('company').reload().then(function(company){
      return Ember.RSVP.hash({
        purchaseTransaction: ref.modelFor('company.transactions.purchase-transactions.purchase-transaction').reload(),
        allProjects: company.get('projects'),
        allProviders: company.get('providers'),
        allPaymentTypes: company.get('paymentTypes')
      });
    });
  },
  setupController: function(controller, models) {
    controller.set('purchaseTransaction', models.purchaseTransaction);
    controller.set('allProjects', models.allProjects);
    controller.set('allProviders', models.allProviders);
    controller.set('allPaymentTypes', models.allPaymentTypes);
  },
  actions: {
    added(){
      var t_model = this.get('intl').t('models.purchaseTransaction');
      var message = this.get('intl').t('product.messages.model_updated',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions.purchase-transactions.purchase-transaction');
    },
    canceled(){
      this.transitionTo('company.transactions.purchase-transactions.purchase-transaction');
    },
    willTransition(transition) {
      var purchaseTransaction = this.controller.get('purchaseTransaction');
      if (purchaseTransaction.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        purchaseTransaction.rollbackAttributes();
        return true;
      }
    }
  }
});
