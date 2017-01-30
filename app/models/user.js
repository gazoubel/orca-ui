import DS from 'ember-data';

export default DS.Model.extend({
  companyRelationships: DS.hasMany('company-to-user', {inverse: 'user'})
});