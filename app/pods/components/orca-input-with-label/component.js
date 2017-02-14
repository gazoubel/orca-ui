import Ember from 'ember';
import generateUuid from 'orca-ui/helpers/generate-uuid';

export default Ember.Component.extend({
  validation:{},
  field: null,
  displayText: '',
  isDisabled: false,
  isMultiline: false,
  isUppercase: false,
  idInput: '',
  maxlength: 524288,
  size: 5,

  onChange: function() {},

  idInputElement: Ember.computed('idInput', function() {
    var idInput = this.get('idInput');
    return (idInput === '') ? 'orca' + generateUuid.compute() : idInput;
  }),

  cssClass: Ember.computed('isUppercase', function() {
    return Ember.String.htmlSafe('form-control mousetrap' + (this.get('isUppercase') ? ' uppercase' : ''));
  }),

  actions: {
    onChange: function() {
      this.get('onChange')();
    }
  }

});
