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
  canCreate: Ember.computed('oncreate',function(){
    let oncreate = this.get('oncreate');
    if(oncreate){
      return true;
    }
    return false;
  }),
  // isInlineText: false,
  idInput: '',
  search:function(){},
  onchange:function(){},
  oncreate:null,
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
  }),
  actions: {
    hideCreateOptionOnSameName(name) {
      // return false;
      let existingOption = this.get('options').findBy('name', name);
      return !existingOption;
    },
  },
});
