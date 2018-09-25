import Ember from 'ember';

export default Ember.Component.extend({
  validation:{},
  field: null,
  displayText: '',
  isDisabled: false,
  idInput: '',
  maxlength: 524288,

  onChange: function() {},

  idInputElement: Ember.computed('idInput', function() {
    var idInput = this.get('idInput');
    return (idInput === '') ? 'orca' + Ember.generateGuid() : idInput;
  }),

  cssClass: Ember.computed('isUppercase', function() {
    return Ember.String.htmlSafe('form-control mousetrap');
  }),

  actions: {
    onChange: function() {
      this.get('onChange')();
    }
  }

});
