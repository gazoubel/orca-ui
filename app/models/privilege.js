import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  company: [
    validator('presence', true),
    validator('belongs-to')
  ]
});

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  company: DS.belongsTo('company',{inverse: 'privileges'}),
  people: DS.hasMany('person', {inverse: 'privilege'}),
  // displayAdminTab: DS.attr('boolean'),
  company_administration: DS.attr('boolean')
});
