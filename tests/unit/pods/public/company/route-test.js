import { moduleFor, test } from 'ember-qunit';

moduleFor('route:public/company', 'Unit | Route | public/company', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
