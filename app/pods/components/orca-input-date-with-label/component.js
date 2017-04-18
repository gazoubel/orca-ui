import Ember from 'ember';

export default Ember.Component.extend({
  validation:{},
  field: null,
  displayText: '',
  isDisabled: false,
  isInlineText: false,
  idInput: '',
  // first: false,
  // last: false,

  idInputElement: Ember.computed('idInput', function() {
    var idInput = this.get('idInput');
    return (idInput === '') ? 'orca' + Ember.generateGuid() : idInput;
  }),
});
