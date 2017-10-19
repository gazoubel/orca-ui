import Ember from 'ember';

export default Ember.Controller.extend({
  paymentTransaction:null,
  actions:{
    markAsPaidToday: function(paymentTransaction){
      paymentTransaction.set('transactionPaidOn', new Date());
      paymentTransaction.save();
    },
    remove: function (item){
      var ref = this;
      Ember.run(function(){
        var paymentTransaction = ref.get('paymentTransaction');
        item.destroyRecord().then(function(){
          paymentTransaction.reload();
        });
      });

    }
  }
});
