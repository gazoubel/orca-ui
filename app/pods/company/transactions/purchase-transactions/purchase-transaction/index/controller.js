import Ember from 'ember';

export default Ember.Controller.extend({
  purchaseTransaction:null,
  actions:{
    remove: function (item){
      var ref = this;
      Ember.run(function(){
        var purchaseTransaction = ref.get('purchaseTransaction');
        // purchaseTransaction.get('purchaseTransactionItems').removeObject(item)
        // purchaseTransaction.save();
        item.destroyRecord().then(function(){
          purchaseTransaction.reload();
        });
      });

    }
  }
});
