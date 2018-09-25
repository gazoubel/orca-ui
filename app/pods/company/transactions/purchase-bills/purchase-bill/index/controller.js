import Ember from 'ember';

export default Ember.Controller.extend({
  intl: Ember.inject.service(),
  purchaseBill:null,
  actions:{
    markAsPaidToday: function(purchaseBill){
      var _this = this;
      var intl = this.get('intl');
      var person = this.get('session.sessionVariables.person');
      var paymentTransaction = this.store.createRecord('payment-transaction', {
        company:purchaseBill.get('company'),
        purchaseBill: purchaseBill,
        total: purchaseBill.get('totalLeftToPay'),
        paymentType: purchaseBill.get('paymentType'),
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
    },
    remove: function (item){
      var ref = this;
      Ember.run(function(){
        var purchaseBill = ref.get('purchaseBill');
        item.destroyRecord().then(function(){
          purchaseBill.reload();
        });
      });

    },
    removePayment: function (item){
      var ref = this;
      Ember.run(function(){
        var purchaseBill = ref.get('purchaseBill');
        item.destroyRecord().then(function(){
          purchaseBill.reload();
        });
      });

    }
  }
});
