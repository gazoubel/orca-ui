import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  acronym: DS.attr('string'),
  userRelationships: DS.hasMany('company-to-user', {inverse: 'company'})

});
