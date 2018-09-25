import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  isLabor: validator('presence', true),
  company: [
    validator('presence', true),
    validator('belongs-to')
  ]
});

export default DS.Model.extend(Validations,{
  name: DS.attr('string'),
  isLabor: DS.attr('boolean'),
  company: DS.belongsTo('company',{inverse: 'itemTypes'}),
  // basicTypeName: Ember.computed('basicType', function() {
  //   var basicType = this.get('basicType');
  //   return 'fields.basicTypes.'+(basicType||'material');
  // }),
});
