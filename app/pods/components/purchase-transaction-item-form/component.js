import Ember from 'ember';

export default Ember.Component.extend({
  purchaseTransactionItem: null,
  actions: {
    save(purchaseTransactionItem) {
      var _ref = this;

      if (!purchaseTransactionItem.get('validations.isValid')) {
        _ref.get('appManager').notify('error', purchaseTransactionItem.get('validations.messages'));
        return;
      }
      return purchaseTransactionItem.save().then(function(){
        _ref.sendAction('onSaveClicked', purchaseTransactionItem);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(purchaseTransactionItem) {
      purchaseTransactionItem.rollbackAttributes();
      this.sendAction('onCancelClicked');
    }
  }
});
