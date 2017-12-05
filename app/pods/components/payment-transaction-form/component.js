import Ember from 'ember';

export default Ember.Component.extend({
  purchaseTransaction: null,
  newPaymentTransaction: {},
  allPaymentTypes: null,
  maximumAllowed: null,
  paymentType:null,
  total: null,
  session: Ember.inject.service('session'),
  store: Ember.inject.service(),
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('newPaymentTransaction.paymentType', this.get('paymentType'));
    this.set('newPaymentTransaction.transactionPaidOn', new Date());
    this.set('newPaymentTransaction.total', this.get('maximumAllowed'));

  },
  actions: {
    save(newPaymentTransaction) {
      var _ref = this;

      var totalLeftToPay = this.get('maximumAllowed') || 0;
      var thisPayment = newPaymentTransaction.total||0;
      if(thisPayment > totalLeftToPay){
        _ref.get('appManager').notify('error', 'Payment cannot exceed $'+totalLeftToPay);
        return;
      }
      var person = this.get('session.sessionVariables.person');
      var paymentTransaction = _ref.get('store').createRecord('payment-transaction', {
        company: person.get('company'),
        purchaseTransaction: this.get('purchaseTransaction'),
        laborTransaction: this.get('laborTransaction'),
        paidByPerson: person,
        paymentType: newPaymentTransaction.paymentType,
        total: thisPayment,
        transactionPaidOn: newPaymentTransaction.transactionPaidOn,
      });
      paymentTransaction.set('total', thisPayment);

      if (!paymentTransaction.get('validations.isValid')) {
        _ref.get('appManager').notify('error', paymentTransaction.get('validations.messages'));
        paymentTransaction.rollbackAttributes();
        return;
      }
      return paymentTransaction.save().then(function(){
        _ref.sendAction('onSaveClicked', paymentTransaction);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
        paymentTransaction.rollbackAttributes();
      });
    },
    cancel(newPaymentTransaction) {
      // paymentTransaction.rollbackAttributes();
      this.sendAction('onCancelClicked');
    }
  }
});
