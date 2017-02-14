import Ember from 'ember';
import config from 'orca-ui/config/environment';

export default Ember.TextField.extend({

  numeric: false,
  scale: 0,
  stringPattern: '',

  onChange: function() {},

  keyPress: function(event) {
    var value       = this.$().val(),
        iStart      = this.$()[0].selectionStart,
        iEnd        = this.$()[0].selectionEnd,
        charPressed = String.fromCharCode(event.charCode),
        newValue    = value.substring(0, iStart) + charPressed + value.substring(iEnd);
    if (this.get('numeric') && this.numericInvalidKeyPressed(charPressed, newValue)) {
      event.stopImmediatePropagation();
      event.preventDefault();
      return;
    }
  },

  input: function() {
    this.get('onChange')();
  },

  numericInvalidKeyPressed: function(charPressed,newValue) {
    var ds    = config.APP.decimalSeparator;
    var arr   = newValue.split(ds);
    var scale = this.get('scale');
    if (['0','1','2','3','4','5','6','7','8','9', ds].
      indexOf(charPressed) === -1) {
      return true;
    }
    if ((scale < 1) && (charPressed === ds)) {
      return true;
    }
    if (scale > 0) {
      if (arr.length > 2) {
        return true;
      }
      else if ((arr.length === 2) && (arr[1].length > scale)) {
        return true;
      }
    }
    return false;
  }

});
