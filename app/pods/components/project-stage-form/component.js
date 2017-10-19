import Ember from 'ember';

export default Ember.Component.extend({
  projectStage: null,
  allStages: null,
  actions: {
    save(projectStage) {
      var _ref = this;

      if (!projectStage.get('validations.isValid')) {
        _ref.get('appManager').notify('error', projectStage.get('validations.messages'));
        return;
      }
      return projectStage.save().then(function(){
        _ref.sendAction('onSaveClicked', projectStage);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(projectStage) {
      projectStage.rollbackAttributes();
      this.sendAction('onCancelClicked');
    }
  }
});
