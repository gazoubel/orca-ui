import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var ref = this;
    var company = this.modelFor('company');
    var purchaseBill = ref.store.createRecord('purchase-bill', {
      company: company
    });
    // return purchaseBill;
    return Ember.RSVP.hash({
      purchaseBill: purchaseBill,
      allProjects: company.get('projects'),
      allProviders: company.get('providers'),
      allPaymentTypes: company.get('paymentTypes')
    });

    // return this.modelFor('company').reload().then(function(company){
    //   var purchaseBill = ref.store.createRecord('purchase-bill', {
    //     company: company
    //   });
    //   // return purchaseBill;
    //   return Ember.RSVP.hash({
    //     purchaseBill: purchaseBill,
    //     allProjects: company.get('projects'),
    //     allProviders: company.get('providers'),
    //     allPaymentTypes: company.get('paymentTypes')
    //   });
    // });



    // var company_id = this.get('session.sessionVariables.company_id');
    //
    // let purchaseBill = ref.get('store').findRecord('company', company_id)
    //   .then(function(company){
    //     var purchaseBill = ref.store.createRecord('purchase-bill', {
    //       company: company
    //     });
    //     // return purchaseBill;
    //     return Ember.RSVP.hash({
    //       purchaseBill: purchaseBill,
    //       allProjects: ref.get('store').query('project', {company: company_id}),
    //       allProviders: ref.get('store').query('provider', {company: company_id})
    //     });
    //   });
    //   return purchaseBill;
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
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions');
    },
    canceled(){
      this.transitionTo('company.transactions');
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
