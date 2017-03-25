import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('purchase-transaction-form', 'Integration | Component | purchase transaction form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{purchase-transaction-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#purchase-transaction-form}}
      template block text
    {{/purchase-transaction-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
