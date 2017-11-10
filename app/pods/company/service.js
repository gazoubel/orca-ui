import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Service.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  checkUserAccess(currentAcronym, userId){
    var session = this.get('session');
    var store = this.get('store');
    var intl = this.get('intl');
    var promise = new RSVP.Promise(function(resolve, reject) {
      store.query('company', {acronym: currentAcronym})
      .then(function(companies){
        var company = companies.get('firstObject');
        if(company && company.get('id')){
          store.queryRecord('person', {user: userId, company: company.get('id'), isActive: true}).then(function(person){
            if (person) {
              intl.setLocale('en-us');
              var sessionVariables = {
                company_id: company.get('id'),
                company_name: company.get('name'),
                company_acronym: currentAcronym,
                privilege:person.get('isAdmin')?'admin':'other',
                person_id:person.get('id'),
                name: person.get('firstName')+' '+person.get('lastName')
              };
              session.set('sessionVariables', sessionVariables);
              resolve(true);
            }
            reject('user does not have access to this company');

          });

          // store.query('person', {user: userId, company: company.get('id'), isActive: true}).then(function(records){
          //   if(records.get('length')>0){
          //     var person = records.get('firstObject');
          //     if (person) {
          //       intl.setLocale('en-us');
          //       var sessionVariables = {
          //         company_id: company.get('id'),
          //         company_name: company.get('name'),
          //         company_acronym: currentAcronym,
          //         privilege:person.get('isAdmin')?'admin':'other',
          //         person_id:person.get('id'),
          //         name: person.get('firstName')+' '+person.get('lastName')
          //       };
          //       session.set('sessionVariables', sessionVariables);
          //       resolve(true);
          //     }
          //     reject('user does not have access to this company');
          //   } else {
          //       reject('user does not have access to this company');
          //     }
          // });
        } else {
          reject('company does not exist');
        }


        //   store.query('company-to-user', {user: userId, company: company.get('id')})
        //   .then(function(records) {
        //       if(records.get('length')>0){
        //         var companyRelationship = records.get('firstObject');
        //         companyRelationship.get('person')
        //         .then(function(person){
        //           intl.setLocale('en-us');
        //           var sessionVariables = {
        //             company_id: company.get('id'),
        //             company_name: company.get('name'),
        //             company_acronym: currentAcronym,
        //             privilege:companyRelationship.get('privilege'),
        //             person_id:person.get('id'),
        //             name: person.get('firstName')+' '+person.get('lastName')
        //           };
        //           session.set('sessionVariables', sessionVariables);
        //           resolve(true);
        //         }).catch(function(reason){
        //           reject('user does not have records correctly setup.'+ reason);
        //         });
        //       } else {
        //         reject('user does not have access to this company');
        //       }
        //   });
        // } else {
        //   reject('company does not exist');
        // }

      });
    });
    return promise;
  }
});
