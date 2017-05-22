import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    let company = this.modelFor('company').reload();
    var purchaseTransaction = this.modelFor('company.transactions.purchase-transactions.purchase-transaction').reload();
    var purchaseTransactionItem = this.store.createRecord('purchase-transaction-item', {
      purchaseTransaction: purchaseTransaction
    });
    return Ember.RSVP.hash({
      purchaseTransactionItem: purchaseTransactionItem,
      allProjects: company.get('projects'),
      allItems: company.get('items')
    });


    // var company_id = this.get('session.sessionVariables.company_id');
    // var purchaseTransaction = this.modelFor('company.transactions.purchase-transactions.purchase-transaction');
    // var purchaseTransactionItem = this.store.createRecord('purchase-transaction-item', {
    //   purchaseTransaction: purchaseTransaction
    // });
    //
    // return Ember.RSVP.hash({
    //   purchaseTransactionItem: purchaseTransactionItem,
    //   allProjects: this.store.query('project', {company: company_id}),
    //   allItems: this.store.query('item', {company: company_id, isLabor: false})
    // });

  },
  setupController: function(controller, models) {
    controller.set('purchaseTransactionItem', models.purchaseTransactionItem);
    controller.set('allProjects', models.allProjects);
    controller.set('allItems', models.allItems);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.purchaseTransactionItem');
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
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
