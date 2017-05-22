import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    // var company_id = this.get('session.sessionVariables.company_id');
    let company = this.modelFor('company').reload();

    return Ember.RSVP.hash({
      paymentTransaction: this.modelFor('company.transactions.payment-transactions.payment-transaction').reload(),
      allProjects: company.get('projects'),
      allPeople: company.get('people')
    });
  },
  setupController: function(controller, models) {
    controller.set('paymentTransaction', models.paymentTransaction);
    controller.set('allProjects', models.allProjects);
    controller.set('allPeople', models.allPeople);
  },
  actions: {
    added(){
      var t_model = this.get('intl').t('models.paymentTransaction');
      var message = this.get('intl').t('product.messages.model_updated',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions.payment-transactions.payment-transaction');
    },
    canceled(){
      this.transitionTo('company.transactions.payment-transactions.payment-transaction');
    },
    willTransition(transition) {
      var paymentTransaction = this.controller.get('paymentTransaction');
      if (paymentTransaction.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        paymentTransaction.rollbackAttributes();
        return true;
      }
    }
  }
});
