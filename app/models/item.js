import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  company: [
    validator('presence', true),
    validator('belongs-to')
  ],
  purchaseTransactionItems: validator('has-many')
});

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  company: DS.belongsTo('company',{inverse: 'items'}),
  purchaseTransactionItems: DS.hasMany('purchase-transaction-item', {inverse: 'item'}),
  // isLabor: DS.attr('boolean'),
  // laborTransactionItems: DS.hasMany('labor-transaction-item', {inverse: 'item'}),
});
