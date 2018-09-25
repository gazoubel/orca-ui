import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  company: [
    validator('presence', true),
    validator('belongs-to')
  ],
  purchaseBillItems: validator('has-many')
});

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  company: DS.belongsTo('company',{inverse: 'items'}),
  purchaseBillItems: DS.hasMany('purchase-bill-item', {inverse: 'item'}),
  // isLabor: DS.attr('boolean'),
  // paycheckItems: DS.hasMany('paycheck-item', {inverse: 'item'}),
});
