import Ember from 'ember';

export default Ember.Controller.extend({
  intl: Ember.inject.service(),
  paycheck:null,
  actions:{
    markAsPaidToday: function(paycheck){
      var _this = this;
      var intl = this.get('intl');
      var person = this.get('session.sessionVariables.person');
      var paymentTransaction = this.store.createRecord('payment-transaction', {
        company:paycheck.get('company'),
        paycheck: paycheck,
        total: paycheck.get('totalLeftToPay'),
        paymentType: paycheck.get('paymentType'),
        paidByPerson: person,
        transactionPaidOn:new Date()
      });
      paymentTransaction.save().then(function() {
          var message = intl.t('product.transactions.transaction_paid_in_full');
          _this.get('appManager').notify('success', message);
          return;
      }, function(error){
        _this.get('appManager').notify('error', error.detailedMessage);
        paymentTransaction.rollbackAttributes();
      }).catch(function(reason){
        paymentTransaction.rollbackAttributes();
        _this.get('appManager').notify('error', reason);
      });
      // paycheck.set('transactionPaidOn', new Date());
      // paycheck.save();
    },
    remove: function (item){
      var ref = this;
      Ember.run(function(){
        var paycheck = ref.get('paycheck');
        item.destroyRecord().then(function(){
          paycheck.reload();
        });
      });

    },
    removePayment: function (item){
      var ref = this;
      Ember.run(function(){
        var paycheck = ref.get('paycheck');
        item.destroyRecord().then(function(){
          paycheck.reload();
        });
      });

    }
  }
});
