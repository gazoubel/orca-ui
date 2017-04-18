// import ENV from '../config/environment';
// import Datepicker from 'ember-cli-bootstrap-datepicker/components/bootstrap-datepicker';
//
// export default Datepicker.extend({
//   weekStart:      1,
//   format:         'mm/dd/yyyy',
//   language:       'en-US',
//   todayHighlight: true,
//   daysOfWeekHighlighted: [0,6],
// });

// import ENV from '../config/environment';
import Datepicker from 'ember-cli-bootstrap-datepicker/components/bootstrap-datepicker';

var self;

export default Datepicker.extend({
  weekStart:      1,
  format:         'mm/dd/yyyy',
  language:       'en-US',
  todayHighlight: true,
  daysOfWeekHighlighted: [0,6],

  onChange: function() {},

  keyPress: function(event) {
    var value       = this.$().val(),
        iStart      = this.$()[0].selectionStart,
        iEnd        = this.$()[0].selectionEnd,
        charPressed = String.fromCharCode(event.charCode),
        newValue    = value.substring(0, iStart) + charPressed + value.substring(iEnd);
    if (event.keyCode === 13) {
      return;
    }
    if (this.invalidKeyPressed(charPressed, newValue)) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  },

  didInsertElement : function(){
    this._super();
    self = this;
  },

  changeDate: function() {
    self.get('onChange')();
    // console.log('.................................................................. changeDate');
  },

  input: function() {
    self.get('onChange')();
    // console.log('.................................................................. input');
  },

  focusOut: function() {
    let memo = this.get('value');
    this.set('value', this.parseInputText());
    // console.log('.................................................................. ' + event.target.value);
    if (memo !== this.get('value')) {
      self.get('onChange')();
      // console.log('.................................................................. ' + memo + ' - ' + this.get('value'));
    }
  },

  invalidKeyPressed: function(charPressed, newValue) {
    // var ds    = this.appManager.get('dateSeparator');
    // var ds    = ENV.APP.dateSeparator;
    var ds    = '/';

    var arr   = newValue.split(ds);
    if (['0','1','2','3','4','5','6','7','8','9', ds].
      indexOf(charPressed) === -1) {
      return true;
    }
    if (arr.length > 3) {
      return true;
    }
    return false;
  },

  // Try to transform what user digited in a valid date ------------------------

  parseInputText: function() {
    if (this.element.value.indexOf('/') === -1) {
     return this.parseOnlyNumbers();
    }
    else {
      return this.parseNumbersWithSeparator();
    }
  },

  parseOnlyNumbers: function() {
    let str = this.element.value;
    if ((str.length === 1) || (str.length === 2)) {
      return this.createNewDate(str);
    }
    else if (str.length === 4) {
      return this.createNewDate(str.substring(0,2), str.substring(2,4));
    }
    else if ((str.length === 6) || (str.length === 8)) {
      return this.createNewDate(str.substring(0,2), str.substring(2,4), str.substring(4));
    }
    else {
      // return null;
      return this.createNewDate(str);
    }

  },

  parseNumbersWithSeparator: function() {
    let arr = this.element.value.split('/');
    if (arr.length === 2) {
      return this.createNewDate(arr[0], arr[1]);
    }
    else if (arr.length === 3) {
      return this.createNewDate(arr[0], arr[1], arr[2]);
    }
    else {
      return null;
    }
  },

  createNewDate: function(day, month, year) {
    let now = new Date();
    let wMonth;
    let wYear;
    let wStr;
    if ((Number(day) === 0) || (month && (Number(month) === 0)) || (year && (Number(year) === 0))) {
      return null;
    }
    wMonth = (month ? Number(month) : now.getMonth() + 1).toString();
    wYear  = (year  ? Number(year)  : now.getFullYear()).toString();
    if (wYear.length === 2) {
      wYear = '20' + wYear;
    }
    wStr   = wYear + '-' + wMonth + '-' + day;
    return isNaN(Date.parse(wStr)) ? null : new Date(Number(wYear), Number(wMonth) - 1, Number(day));
  }

});
