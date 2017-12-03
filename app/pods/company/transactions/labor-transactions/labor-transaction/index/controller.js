import Ember from 'ember';

export default Ember.Controller.extend({
  intl: Ember.inject.service(),
  laborTransaction:null,
  actions:{
    markAsPaidToday: function(laborTransaction){
      var _this = this;
      var intl = this.get('intl');
      var person = this.get('session.sessionVariables.person');
      var paymentTransaction = this.store.createRecord('payment-transaction', {
        company:laborTransaction.get('company'),
        laborTransaction: laborTransaction,
        total: laborTransaction.get('total'),
        paymentType: laborTransaction.get('paymentType'),
        paidByPerson: person,
        transactionPaidOn:new Date()
      });
      paymentTransaction.save().then(function() {
          var message = intl.t('company.transactions.transaction_paid_in_full');
          _this.get('appManager').notify('success', message);
          return;
      }, function(error){
        _this.get('appManager').notify('error', error.detailedMessage);
        paymentTransaction.rollbackAttributes();
      }).catch(function(reason){
        paymentTransaction.rollbackAttributes();
        _this.get('appManager').notify('error', reason);
      });
      // laborTransaction.set('transactionPaidOn', new Date());
      // laborTransaction.save();
    },
    remove: function (item){
      var ref = this;
      Ember.run(function(){
        var laborTransaction = ref.get('laborTransaction');
        item.destroyRecord().then(function(){
          laborTransaction.reload();
        });
      });

    },
    removePayment: function (item){
      var ref = this;
      Ember.run(function(){
        var laborTransaction = ref.get('laborTransaction');
        item.destroyRecord().then(function(){
          laborTransaction.reload();
        });
      });

    }
  }
});
