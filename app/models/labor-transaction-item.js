import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  // name: validator('presence', true),
  // description: validator('presence', true),
  laborTransaction: [
    // validator('presence', true),
    validator('belongs-to')
  ],
  projectStage: [
    validator('presence', true),
    // validator('belongs-to')
  ],
  laborItem: [
    validator('presence', true),
    // validator('belongs-to')
  ],

  total : [
    validator('presence', true),
    validator('number', {
      allowString: true,
      positive : true
    })
  ],
  quantity : [
    validator('presence', true),
    validator('number', {
      allowString: true,
      positive : true
    })
  ],
});

export default DS.Model.extend(Validations, {
  // name: DS.attr('string'),
  description: DS.attr('string'),
  laborTransaction: DS.belongsTo('labor-transaction',{inverse: 'laborTransactionItems'}),
  projectStage: DS.belongsTo('project-stage',{inverse: 'laborTransactionItems'}),
  // item: DS.belongsTo('item',{inverse: 'laborTransactionItems'}),
  laborItem: DS.belongsTo('labor-item',{inverse: 'laborTransactionItems'}),
  total: DS.attr('number'),
  quantity: DS.attr('number'),
});
