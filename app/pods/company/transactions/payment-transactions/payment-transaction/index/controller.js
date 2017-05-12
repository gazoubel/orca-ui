import Ember from 'ember';

export default Ember.Controller.extend({
  paymentTransaction:null,
  actions:{
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
