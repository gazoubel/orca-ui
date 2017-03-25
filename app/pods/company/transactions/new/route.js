import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var ref = this;
    // var sessionVariables = ref.get('session.sessionVariables');
    var company_id = this.get('session.sessionVariables.company_id');
    return ref.get('store').findRecord('company', company_id)
    .then(function(company){
      var purchaseTransaction = ref.store.createRecord('purchase-transaction', {
        company: company
      });
      return purchaseTransaction;
    });
  },
  setupController: function(controller, model) {
    controller.set('purchaseTransaction', model);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.purchaseTransaction');
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions');
    },
    canceled(){
      this.transitionTo('company.transactions');
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
