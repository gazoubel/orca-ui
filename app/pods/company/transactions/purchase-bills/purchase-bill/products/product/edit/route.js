import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    // var company_id = this.get('session.sessionVariables.company_id');
    let company = this.modelFor('company');

    return Ember.RSVP.hash({
      purchaseBillItem: this.modelFor('company.transactions.purchase-bills.purchase-bill.products.product'),
      allProjects: company.get('projects'),
      allItems: company.get('items')
    });
  },
  setupController: function(controller, models) {
    controller.set('purchaseBillItem', models.purchaseBillItem);
    controller.set('allProjects', models.allProjects);
    controller.set('allItems', models.allItems);
  },
  actions: {
    added(){
      var t_model = this.get('intl').t('models.purchaseBillItem');
      var message = this.get('intl').t('product.messages.model_updated',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions.purchase-bills.purchase-bill');
    },
    canceled(){
      this.transitionTo('company.transactions.purchase-bills.purchase-bill');
    },
    willTransition(transition) {
      var purchaseBillItem = this.controller.get('purchaseBillItem');
      if (purchaseBillItem.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        purchaseBillItem.rollbackAttributes();
        return true;
      }
    }
  }
});
