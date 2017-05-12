import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  company: [
    validator('presence', true),
    validator('belongs-to')
  ],
  paymentTransactionItems: validator('has-many')
});

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  company: DS.belongsTo('company',{inverse: 'laborItems'}),
  paymentTransactionItems: DS.hasMany('payment-transaction-item', {inverse: 'laborItem'}),
});
