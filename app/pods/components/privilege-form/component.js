import Ember from 'ember';

export default Ember.Component.extend({
  privilege: null,
  actions: {
    save(privilege) {
      var _ref = this;

      if (!privilege.get('validations.isValid')) {
        _ref.get('appManager').notify('error', privilege.get('validations.messages'));
        return;
      }
      return privilege.save().then(function(){
        _ref.sendAction('onSaveClicked', privilege);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    },
    cancel(privilege) {
      privilege.rollbackAttributes();
      this.sendAction('onCancelClicked');
    }
  }
});
