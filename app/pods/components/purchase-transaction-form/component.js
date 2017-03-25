import Ember from 'ember';

export default Ember.Component.extend({
  purchaseTransaction: null,
  actions: {
    save(purchaseTransaction) {
      var _ref = this;

      if (!purchaseTransaction.get('validations.isValid')) {
        _ref.get('appManager').notify('error', purchaseTransaction.get('validations.messages'));
        return;
      }
      return purchaseTransaction.save().then(function(){
        _ref.sendAction('onSaveClicked', purchaseTransaction);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(purchaseTransaction) {
      purchaseTransaction.rollbackAttributes();
      this.sendAction('onCancelClicked');
    }
  }
});
