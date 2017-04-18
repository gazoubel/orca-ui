import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('orca-input-date-with-label', 'Integration | Component | orca input date with label', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{orca-input-date-with-label}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#orca-input-date-with-label}}
      template block text
    {{/orca-input-date-with-label}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
