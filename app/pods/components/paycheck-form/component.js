import Ember from 'ember';

export default Ember.Component.extend({
  paycheck: null,
  allProjects: null,
  allPeople: null,
  selectedProject: null,
  didReceiveAttrs() {
    this._super(...arguments);
    const project = this.get('paycheck.defaultProjectStage.project');
    this.set('selectedProject', project);
  },
  actions: {
    save(paycheck) {
      var _ref = this;

      if (!paycheck.get('validations.isValid')) {
        _ref.get('appManager').notify('error', paycheck.get('validations.messages'));
        return;
      }
      return paycheck.save().then(function(){
        _ref.sendAction('onSaveClicked', paycheck);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(paycheck) {
      paycheck.rollbackAttributes();
      this.sendAction('onCancelClicked');
    }
  }
});
