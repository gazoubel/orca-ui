import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    // var company_id = this.get('session.sessionVariables.company_id');
    var _this = this;
    var company = this.modelFor('company');
    var laborTransaction = _this.modelFor('company.transactions.labor-transactions.labor-transaction');
    var laborTransactionItem = _this.store.createRecord('labor-transaction-item', {
      laborTransaction: laborTransaction
    });

    return Ember.RSVP.hash({
      laborTransactionItem: laborTransactionItem,
      allProjects: company.get('projects'),
      allLaborItems: company.get('laborItems')
    });

    // return this.modelFor('company').reload().then(function(company){
    //   var laborTransaction = _this.modelFor('company.transactions.labor-transactions.labor-transaction');
    //   var laborTransactionItem = _this.store.createRecord('labor-transaction-item', {
    //     laborTransaction: laborTransaction
    //   });
    //
    //   return Ember.RSVP.hash({
    //     laborTransactionItem: laborTransactionItem,
    //     allProjects: company.get('projects'),
    //     allLaborItems: company.get('laborItems')
    //   });
    // });
  },
  setupController: function(controller, models) {
    controller.set('laborTransactionItem', models.laborTransactionItem);
    controller.set('allProjects', models.allProjects);
    controller.set('allLaborItems', models.allLaborItems);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.laborTransactionItem');
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.transactions.labor-transactions.labor-transaction');
    },
    canceled(){
      this.transitionTo('company.transactions.labor-transactions.labor-transaction');
    },
    willTransition(transition) {
      var laborTransactionItem = this.controller.get('laborTransactionItem');
      if (laborTransactionItem.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        laborTransactionItem.rollbackAttributes();
        return true;
      }
    }
  }
});
