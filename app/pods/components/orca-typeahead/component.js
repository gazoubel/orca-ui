import EmberPowerSelectTypeahead from 'ember-power-select-typeahead-with-create/components/power-select-typeahead-with-create';
import Ember from 'ember';

export default EmberPowerSelectTypeahead.extend({
  // allowClear: true,
  intl: Ember.inject.service(),
  placeholder: Ember.computed(function() {
    return this.get('intl').t('product.commonWords.select');
  }),
  // matchTriggerWidth: false
});
