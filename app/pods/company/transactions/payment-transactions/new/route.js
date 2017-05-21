import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var ref = this;
    var company_id = this.get('session.sessionVariables.company_id');

    let paymentTransaction = ref.get('store').findRecord('company', company_id)
      .then(function(company){
        var paymentTransaction = ref.store.createRecord('payment-transaction', {
          company: company
        });
        return Ember.RSVP.hash({
          paymentTransaction: paymentTransaction,
          allProjects: ref.get('store').query('project', {company: company_id}),
          allPeople: ref.get('store').query('person', {company: company_id})
        });
      });
      return paymentTransaction;
  },
  setupController: function(controller, models) {
    controller.set('paymentTransaction', models.paymentTransaction);
    controller.set('allProjects', models.allProjects);
    controller.set('allPeople', models.allPeople);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.paymentTransaction');
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions');
    },
    canceled(){
      this.transitionTo('company.transactions');
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
