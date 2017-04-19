import Ember from 'ember';
import CurrencyInputComponent from 'ember-inputmask/components/currency-input';
// import CurrencyInputComponent from 'ember-inputmask/components/input-mask';
// import InputMaskCurrency from 'ember-inputmask/components/currency-input';

export default CurrencyInputComponent.extend({
  rawValue: null,
  unmaskedValue: Ember.computed('rawValue', {
    get() {
      let rawValue = this.get('rawValue');
      return rawValue/100;
    },
    set(key, value) {
      this.set('rawValue', value*100);
      return value;
    }
  })
});
