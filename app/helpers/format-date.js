import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';
import locale from 'ember-moment/computeds/locale';

export default Ember.Helper.extend({
  moment: Ember.inject.service(),

  compute: function(params) {
    let value = params[0];
    
    return moment(params[0]).format(this.get('moment.defaultFormat'));
  }
});
