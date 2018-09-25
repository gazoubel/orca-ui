import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('orca-dropdown', 'Integration | Component | orca dropdown', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{orca-dropdown}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#orca-dropdown}}
      template block text
    {{/orca-dropdown}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
