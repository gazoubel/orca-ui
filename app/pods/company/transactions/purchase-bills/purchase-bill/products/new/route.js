import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    let company = this.modelFor('company');
    var purchaseBill = this.modelFor('company.transactions.purchase-bills.purchase-bill');
    var purchaseBillItem = this.store.createRecord('purchase-bill-item', {
      purchaseBill: purchaseBill
    });
    return Ember.RSVP.hash({
      purchaseBillItem: purchaseBillItem,
      allProjects: company.get('projects'),
      allItems: company.get('items')
    });


    // var company_id = this.get('session.sessionVariables.company_id');
    // var purchaseBill = this.modelFor('company.transactions.purchase-bills.purchase-bill');
    // var purchaseBillItem = this.store.createRecord('purchase-bill-item', {
    //   purchaseBill: purchaseBill
    // });
    //
    // return Ember.RSVP.hash({
    //   purchaseBillItem: purchaseBillItem,
    //   allProjects: this.store.query('project', {company: company_id}),
    //   allItems: this.store.query('item', {company: company_id, isLabor: false})
    // });

  },
  setupController: function(controller, models) {
    controller.set('purchaseBillItem', models.purchaseBillItem);
    controller.set('allProjects', models.allProjects);
    controller.set('allItems', models.allItems);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.purchaseBillItem');
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
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
