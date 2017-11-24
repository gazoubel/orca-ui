import Ember from 'ember';

export default Ember.Controller.extend({
  laborTransaction:null,
  actions:{
    markAsPaidToday: function(laborTransaction){
      laborTransaction.set('transactionPaidOn', new Date());
      laborTransaction.save();
    },
    remove: function (item){
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
