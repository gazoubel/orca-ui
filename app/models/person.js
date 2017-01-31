import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  user: DS.belongsTo('user', {inverse: 'person', async: true})

});
