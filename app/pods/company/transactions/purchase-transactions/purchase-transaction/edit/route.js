import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var company_id = this.get('session.sessionVariables.company_id');
    return Ember.RSVP.hash({
      purchaseTransaction: this.modelFor('company.transactions.purchase-transactions.purchase-transaction'),
      allProjects: this.store.findAll('project', {company: company_id}),
      allProviders: this.store.findAll('provider', {company: company_id})
    });
  },
  setupController: function(controller, models) {
    controller.set('purchaseTransaction', models.purchaseTransaction);
    controller.set('allProjects', models.allProjects);
    controller.set('allProviders', models.allProviders);
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
