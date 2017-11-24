import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('labor-transaction-item-form', 'Integration | Component | payment transaction item form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{labor-transaction-item-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#labor-transaction-item-form}}
      template block text
    {{/labor-transaction-item-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
