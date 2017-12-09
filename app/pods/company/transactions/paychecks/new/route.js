import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var ref = this;
    var company = this.modelFor('company');
    var paycheck = ref.store.createRecord('paycheck', {
      company: company
    });
    return Ember.RSVP.hash({
      paycheck: paycheck,
      allProjects: company.get('projects'),
      allPeople: company.get('people'),
      allPaymentTypes: company.get('paymentTypes')
    });
    //
    // return this.modelFor('company').then(function(company){
    //   var paycheck = ref.store.createRecord('paycheck', {
    //     company: company
    //   });
    //   return Ember.RSVP.hash({
    //     paycheck: paycheck,
    //     allProjects: company.get('projects'),
    //     allPeople: company.get('people'),
    //     allPaymentTypes: company.get('paymentTypes')
    //   });
    // });
  },
  setupController: function(controller, models) {
    controller.set('paycheck', models.paycheck);
    controller.set('allProjects', models.allProjects);
    controller.set('allPeople', models.allPeople);
    controller.set('allPaymentTypes', models.allPaymentTypes);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.paycheck');
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions');
    },
    canceled(){
      this.transitionTo('company.transactions');
    },
    willTransition(transition) {
      var paycheck = this.controller.get('paycheck');
      if (paycheck.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        paycheck.rollbackAttributes();
        return true;
      }
    }
  }
});
