import Ember from 'ember';
import moment from 'moment';
// import momentComputed from 'ember-moment/computeds/moment';
// import format from 'ember-moment/computeds/format';
// import locale from 'ember-moment/computeds/locale';

export default Ember.Helper.extend({
  moment: Ember.inject.service(),

  compute: function(params) {
    // let value = params[0];

    return moment(params[0]).format(this.get('moment.defaultFormat'));
    // return this.get('moment').format(params[0], this.get('moment.defaultFormat'));
    // let mom = momentComputed(params[0]);
    // let value = format(mom, this.get('moment.defaultFormat'));
    // return value.toString();
  }
});
