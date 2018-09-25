import Ember from 'ember';
// import generateUuid from 'orca-ui/helpers/generate-uuid';

export default Ember.Component.extend({
  classNames: ['form-group'],

  classNameBindings: ['hasError'],
  hasError: false,

  options: {},
  selected: {},
  displayText: '',
  isDisabled: false,
  // isInlineText: false,
  idInput: '',
  // first: false,
  // last: false,
  // size: 5,
  // inlineLabelSize: Ember.computed('isInlineText','size', function() {
  //   return 12-this.get('size');
  // }),
  didReceiveAttrs(){
    this._super(...arguments);
  },

  idInputElement: Ember.computed('idInput', function() {
    var idInput = this.get('idInput');
    return (idInput === '') ? 'orca' + Ember.generateGuid() : idInput;
  })

});
