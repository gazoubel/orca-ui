import DS from 'ember-data';

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  userRelationships: validator('has-many'),
  stages: validator('has-many'),
  providers: validator('has-many'),
  paymentTypes: validator('has-many'),
  itemTypes: validator('has-many'),
  projects: validator('has-many')

});

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  acronym: DS.attr('string'),
  userRelationships: DS.hasMany('company-to-user', {inverse: 'company'}),
  stages: DS.hasMany('stage', {inverse: 'company'}),
  providers: DS.hasMany('provider', {inverse: 'company'}),
  paymentTypes: DS.hasMany('payment-type', {inverse: 'company'}),
  itemTypes: DS.hasMany('item-type', {inverse: 'company'}),
  projects: DS.hasMany('project', {inverse: 'company'})
});
