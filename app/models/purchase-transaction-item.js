import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  // name: validator('presence', true),
  // description: validator('presence', true),
  purchaseTransaction: [
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
  purchaseTransaction: DS.belongsTo('purchase-transaction',{inverse: 'purchaseTransactionItems'}),
  projectStage: DS.belongsTo('project-stage',{inverse: 'purchaseTransactionItems'}),
  item: DS.belongsTo('item',{inverse: 'purchaseTransactionItems'}),
  total: DS.attr('number'),
  quantity: DS.attr('number'),
});
