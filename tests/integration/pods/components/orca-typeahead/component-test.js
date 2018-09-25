import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('orca-typeahead', 'Integration | Component | orca typeahead', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{orca-typeahead}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#orca-typeahead}}
      template block text
    {{/orca-typeahead}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
