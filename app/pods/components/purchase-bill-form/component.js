import Ember from 'ember';

export default Ember.Component.extend({
  purchaseBill: null,
  allProjects: null,
  allProviders: null,
  allPaymentTypes: null,
  selectedProject: null,
  didReceiveAttrs() {
    this._super(...arguments);
    const project = this.get('purchaseBill.defaultProjectStage.project');
    this.set('selectedProject', project);
  },
  actions: {
    save(purchaseBill) {
      var _ref = this;

      if (!purchaseBill.get('validations.isValid')) {
        _ref.get('appManager').notify('error', purchaseBill.get('validations.messages'));
        return;
      }
      return purchaseBill.save().then(function(){
        _ref.sendAction('onSaveClicked', purchaseBill);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(purchaseBill) {
      purchaseBill.rollbackAttributes();
      this.sendAction('onCancelClicked');
    }
  }
});
