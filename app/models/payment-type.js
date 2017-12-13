import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  company: [
    validator('presence', true),
    validator('belongs-to')
  ],
  purchaseBills: validator('has-many'),
});

export default DS.Model.extend(Validations,{
  name: DS.attr('string'),
  company: DS.belongsTo('company',{inverse: 'paymentTypes'}),
  purchaseBills: DS.hasMany('purchase-bill',   {inverse: 'paymentType'}),
  paychecks: DS.hasMany('paycheck',   {inverse: 'paymentType'}),
  paymentTransactions: DS.hasMany('payment-transaction',   {inverse: 'paymentType'})  
});
