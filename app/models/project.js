import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  projectStages: validator('has-many'),
  company: [
    validator('presence', true),
    validator('belongs-to')
  ]
});

export default DS.Model.extend(Validations,{
  name: DS.attr('string'),
  projectStages: DS.hasMany('project-stage', {inverse: 'project'}),
  company: DS.belongsTo('company',{inverse: 'projects'})
});
