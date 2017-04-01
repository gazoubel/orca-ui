import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  company: [
    validator('presence', true),
    validator('belongs-to')
  ]
});

export default DS.Model.extend(Validations,{
  route: Ember.computed(function(){
    return 'company.transactions.purchase-transactions.purchase-transaction';
  }),
  description: DS.attr('string'),
  company: DS.belongsTo('company',{inverse: 'purchaseTransactions'}),
  provider: DS.belongsTo('provider',{inverse: 'purchaseTransactions'}),
  purchaseTransactionItems: DS.hasMany('purchase-transaction-item', {inverse: 'purchaseTransaction'})
});
