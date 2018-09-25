import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var ref = this;
    return this.modelFor('company').reload().then(function(company){
      return Ember.RSVP.hash({
        purchaseBill: ref.modelFor('company.transactions.purchase-bills.purchase-bill').reload(),
        allProjects: company.get('projects'),
        allProviders: company.get('providers'),
        allPaymentTypes: company.get('paymentTypes')
      });
    });
  },
  setupController: function(controller, models) {
    controller.set('purchaseBill', models.purchaseBill);
    controller.set('allProjects', models.allProjects);
    controller.set('allProviders', models.allProviders);
    controller.set('allPaymentTypes', models.allPaymentTypes);
  },
  actions: {
    added(){
      var t_model = this.get('intl').t('models.purchaseBill');
      var message = this.get('intl').t('product.messages.model_updated',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions.purchase-bills.purchase-bill');
    },
    canceled(){
      this.transitionTo('company.transactions.purchase-bills.purchase-bill');
    },
    willTransition(transition) {
      var purchaseBill = this.controller.get('purchaseBill');
      if (purchaseBill.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        purchaseBill.rollbackAttributes();
        return true;
      }
    }
  }
});
