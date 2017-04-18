import Ember from 'ember';

// export default Ember.import Ember from 'ember';

export default Ember.Helper.extend({
  intl: Ember.inject.service(),
  compute: function(params) {
    let value = (params[0] || 0) / 100;
    return this.get('intl').formatNumber(value, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
});
//
// export function formatCurrency(params/*, hash*/) {
//   return params;
// }
//
// export default Ember.Helper.helper(formatCurrency);
