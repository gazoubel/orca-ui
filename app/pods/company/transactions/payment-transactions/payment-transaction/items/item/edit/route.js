import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var company_id = this.get('session.sessionVariables.company_id');
    // var paymentTransaction = this.modelFor('company.transactions.payment-transactions.payment-transaction');

    return Ember.RSVP.hash({
      paymentTransactionItem: this.modelFor('company.transactions.payment-transactions.payment-transaction.items.item'),
      allProjects: this.store.query('project', {company: company_id}),
      allItems: this.store.query('item', {company: company_id, isLabor: true})
    });

  },
  setupController: function(controller, models) {
    controller.set('paymentTransactionItem', models.paymentTransactionItem);
    controller.set('allProjects', models.allProjects);
    controller.set('allItems', models.allItems);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.paymentTransactionItem');
      var message = this.get('intl').t('product.messages.model_updated',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions.payment-transactions.payment-transaction');
    },
    canceled(){
      this.transitionTo('company.transactions.payment-transactions.payment-transaction');
    },
    willTransition(transition) {
      var paymentTransactionItem = this.controller.get('paymentTransactionItem');
      if (paymentTransactionItem.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        paymentTransactionItem.rollbackAttributes();
        return true;
      }
    }
  }
});
