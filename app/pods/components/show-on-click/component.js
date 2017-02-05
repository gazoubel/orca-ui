import Ember from 'ember';

export default Ember.Component.extend({
  modelIsInValid: false,
  isAdding: false,
  formCss: "form-inline pull-right",
  actions: {
    openAddPanel: function(){
      this.set('isAdding', true);
    },
    addClicked:function(){
      this.sendAction('onAddClicked', this.get("itemAdded"));
    },
    closeClicked: function(){
      this.set('isAdding', false);
      this.set('modelIsInValid', false);
      this.sendAction('onCloseClicked');
    }
  }
});
