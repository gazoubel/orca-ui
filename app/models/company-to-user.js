import DS from 'ember-data';

export default DS.Model.extend({
  privilege: DS.attr('string'),
  user: DS.belongsTo('user',{inverse: 'companyRelationships'}),
  company: DS.belongsTo('company',{inverse: 'userRelationships'}),
  person: DS.belongsTo('person',{inverse: 'companyRelationship'})
});
