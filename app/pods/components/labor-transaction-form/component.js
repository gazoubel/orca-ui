import Ember from 'ember';

export default Ember.Component.extend({
  laborTransaction: null,
  allProjects: null,
  allPeople: null,
  selectedProject: null,
  didReceiveAttrs() {
    this._super(...arguments);
    const project = this.get('laborTransaction.defaultProjectStage.project');
    this.set('selectedProject', project);
  },
  actions: {
    save(laborTransaction) {
      var _ref = this;

      if (!laborTransaction.get('validations.isValid')) {
        _ref.get('appManager').notify('error', laborTransaction.get('validations.messages'));
        return;
      }
      return laborTransaction.save().then(function(){
        _ref.sendAction('onSaveClicked', laborTransaction);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(laborTransaction) {
      laborTransaction.rollbackAttributes();
      this.sendAction('onCancelClicked');
    }
  }
});
