import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function (params) {
    return this.modelFor('company.transactions.purchase-transactions.purchase-transaction');
  },
  setupController: function(controller, model) {
    controller.set('purchaseTransaction', model);
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
