import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  // name: validator('presence', true),
  // description: validator('presence', true),
  purchaseBill: [
    validator('presence', true),
    validator('belongs-to')
  ],
  projectStage: [
    validator('presence', true),
    // validator('belongs-to')
  ],
  item: [
    validator('presence', true),
    // validator('belongs-to')
  ],
  //
  // item: [
  //   validator('presence', {
  //     presence: true,
  //     ignoreBlank: true,
  //   }),
  //   validator('belongs-to')
  // ],

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
  purchaseBill: DS.belongsTo('purchase-bill',{inverse: 'purchaseBillItems'}),
  projectStage: DS.belongsTo('project-stage',{inverse: 'purchaseBillItems'}),
  item: DS.belongsTo('item',{inverse: 'purchaseBillItems'}),
  total: DS.attr('number'),
  quantity: DS.attr('number'),
});
