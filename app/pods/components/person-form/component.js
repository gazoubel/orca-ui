import Ember from 'ember';

export default Ember.Component.extend({
  person: null,
  actions: {
    save(person) {
      var _ref = this;

      if (!person.get('validations.isValid')) {
        _ref.get('appManager').notify('error', project.get('validations.messages'));
        return;
      }
      return person.save().then(function(){
        _ref.sendAction('onSaveClicked', person);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(person) {
      person.rollbackAttributes();
      this.sendAction('onCancelClicked');
    }
  }
});
