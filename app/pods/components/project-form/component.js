import Ember from 'ember';

export default Ember.Component.extend({
  project: null,
  actions: {
    save(project) {
      var _ref = this;

      if (!project.get('validations.isValid')) {
        _ref.get('appManager').notify('error', project.get('validations.messages'));
        return;
      }
      return project.save().then(function(){
        _ref.sendAction('onSaveClicked', project);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(project) {
      project.rollbackAttributes();
      this.sendAction('onCancelClicked');
    }
  }
});
