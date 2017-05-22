import DS from 'ember-data';
import Ember from 'ember';

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  firstName: validator('presence', true),
  lastName: validator('presence', true),
  company: validator('belongs-to'),
  user: validator('has-many')

});

export default DS.Model.extend(Validations, {
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  user: DS.belongsTo('user', {inverse: 'person', async: true}),
  company: DS.belongsTo('company',{inverse: 'people'}),
  paymentTransactions: DS.hasMany('payment-transaction',   {inverse: 'person'}),
  name: Ember.computed('firstName','lastName', function(){
    return Ember.get(this, 'firstName')+' '+Ember.get(this, 'lastName');
  })
});
