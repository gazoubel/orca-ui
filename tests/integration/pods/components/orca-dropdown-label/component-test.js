import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('orca-dropdown-label', 'Integration | Component | orca dropdown label', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{orca-dropdown-label}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#orca-dropdown-label}}
      template block text
    {{/orca-dropdown-label}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
