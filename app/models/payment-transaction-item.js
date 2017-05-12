import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  // name: validator('presence', true),
  // description: validator('presence', true),
  paymentTransaction: [
    validator('presence', true),
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
  paymentTransaction: DS.belongsTo('payment-transaction',{inverse: 'paymentTransactionItems'}),
  projectStage: DS.belongsTo('project-stage',{inverse: 'paymentTransactionItems'}),
  // item: DS.belongsTo('item',{inverse: 'paymentTransactionItems'}),
  laborItem: DS.belongsTo('labor-item',{inverse: 'paymentTransactionItems'}),
  total: DS.attr('number'),
  quantity: DS.attr('number'),
});
