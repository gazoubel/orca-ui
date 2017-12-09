import DS from 'ember-data';
import Ember from 'ember';

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  firstName: validator('presence', true),
  lastName: validator('presence', true),
  company: validator('belongs-to'),
  // user: validator('belongs-to'),
  // privilege: validator('presence', true)

});

export default DS.Model.extend(Validations, {
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  user: DS.belongsTo('user', {inverse: 'people', async: true}),
  company: DS.belongsTo('company',{inverse: 'people'}),
  paychecks: DS.hasMany('paycheck',   {inverse: 'person'}),
  projectsAssignedTo: DS.hasMany('project', {inverse: 'assignee'}),
  companyRelationship: DS.belongsTo('company-to-user',{inverse: 'person'}),
  teamMemberOf: DS.hasMany('project'),
  // privilege: DS.attr('string'),
  isActive: DS.attr('boolean'),
  phone: DS.attr('string'),
  notes: DS.attr('string'),
  projects: DS.hasMany('person'),
  isAdmin: DS.attr('boolean'),
  privilege: DS.belongsTo('privilege',{inverse: 'people'}),
  paymentTransactions: DS.hasMany('payment-transaction',   {inverse: 'paidByPerson'}),

  name: Ember.computed('firstName','lastName', function(){
    return Ember.get(this, 'firstName')+' '+Ember.get(this, 'lastName');
  }),
  privilegeName: Ember.computed('isAdmin', 'privilege', 'privilege.name', function(){
    return Ember.get(this, 'isAdmin')?'admin':Ember.get(this, 'privilege.name');
  }),
  activeProjectsAssignedTo: Ember.computed.filterBy('projectsAssignedTo', 'isActive', true),
  activeTeamMemberOf: Ember.computed.filterBy('teamMemberOf', 'isActive', true),
  unpaidpaychecks: Ember.computed.filterBy('paychecks', 'isUnpaid', true),
  // previousRoles: Ember.computed.map('paycheckItems.@each.roles')
  // previousRoles: Ember.computed.uniq('paychecks.@each.paymentRoles')
});
