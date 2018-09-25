import EmberPowerSelect from 'ember-power-select/components/power-select';
import Ember from 'ember';

export default EmberPowerSelect.extend({
  searchEnabled: true,
  allowClear: true,
  intl: Ember.inject.service(),
  placeholder: Ember.computed(function() {
    return this.get('intl').t('product.commonWords.select');
  }),
  matchTriggerWidth: false
});
