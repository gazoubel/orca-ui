import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var company_id = this.get('session.sessionVariables.company_id');

    return Ember.RSVP.hash({
      purchaseTransactionItem: this.modelFor('company.transactions.purchase-transactions.purchase-transaction.products.product'),
      allProjects: this.store.findAll('project', {company: company_id}),
      allItems: this.store.findAll('item', {company: company_id})
    });
  },
  setupController: function(controller, models) {
    controller.set('purchaseTransactionItem', models.purchaseTransactionItem);
    controller.set('allProjects', models.allProjects);
    controller.set('allItems', models.allItems);
  },
  actions: {
    added(){
      var t_model = this.get('intl').t('models.purchaseTransactionItem');
      var message = this.get('intl').t('product.messages.model_updated',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions.purchase-transactions.purchase-transaction');
    },
    canceled(){
      this.transitionTo('company.transactions.purchase-transactions.purchase-transaction');
    },
    willTransition(transition) {
      var purchaseTransactionItem = this.controller.get('purchaseTransactionItem');
      if (purchaseTransactionItem.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        purchaseTransactionItem.rollbackAttributes();
        return true;
      }
    }
  }
});
