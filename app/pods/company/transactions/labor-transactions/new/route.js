import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var ref = this;
    var company = this.modelFor('company');
    var laborTransaction = ref.store.createRecord('labor-transaction', {
      company: company
    });
    return Ember.RSVP.hash({
      laborTransaction: laborTransaction,
      allProjects: company.get('projects'),
      allPeople: company.get('people'),
      allPaymentTypes: company.get('paymentTypes')
    });
    //
    // return this.modelFor('company').then(function(company){
    //   var laborTransaction = ref.store.createRecord('labor-transaction', {
    //     company: company
    //   });
    //   return Ember.RSVP.hash({
    //     laborTransaction: laborTransaction,
    //     allProjects: company.get('projects'),
    //     allPeople: company.get('people'),
    //     allPaymentTypes: company.get('paymentTypes')
    //   });
    // });
  },
  setupController: function(controller, models) {
    controller.set('laborTransaction', models.laborTransaction);
    controller.set('allProjects', models.allProjects);
    controller.set('allPeople', models.allPeople);
    controller.set('allPaymentTypes', models.allPaymentTypes);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.laborTransaction');
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions');
    },
    canceled(){
      this.transitionTo('company.transactions');
    },
    willTransition(transition) {
      var laborTransaction = this.controller.get('laborTransaction');
      if (laborTransaction.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        laborTransaction.rollbackAttributes();
        return true;
      }
    }
  }
});
