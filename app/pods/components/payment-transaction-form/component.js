import Ember from 'ember';

export default Ember.Component.extend({
  paymentTransaction: null,
  allProjects: null,
  selectedProject: null,
  didReceiveAttrs() {
    this._super(...arguments);
    const project = this.get('paymentTransaction.defaultProjectStage.project');
    this.set('selectedProject', project);
  },
  actions: {
    save(paymentTransaction) {
      var _ref = this;

      if (!paymentTransaction.get('validations.isValid')) {
        _ref.get('appManager').notify('error', paymentTransaction.get('validations.messages'));
        return;
      }
      return paymentTransaction.save().then(function(){
        _ref.sendAction('onSaveClicked', paymentTransaction);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(paymentTransaction) {
      paymentTransaction.rollbackAttributes();
      this.sendAction('onCancelClicked');
    }
  }
});
