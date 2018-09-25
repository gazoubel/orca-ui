import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('orca-input-currency', 'Integration | Component | orca input currency', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{orca-input-currency}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#orca-input-currency}}
      template block text
    {{/orca-input-currency}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
