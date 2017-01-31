import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  checkUserAccess(currentAcronym, userId){
    var session = this.get('session');
    var store = this.get('store');
    var promise = new Promise(function(resolve, reject) {
      store.query('company', {acronym: currentAcronym})
      .then(function(companies){
        var company = companies.get('firstObject');
        if(company && company.get('id')){
          store.findAll('company-to-user', {user: userId, company: company.get('id')})
          .then(function(records) {
              if(records.get('length')>0){
                var companyRelationship = records.get('firstObject');
                companyRelationship.get('user')
                .then(function(user){
                  return user.get('person');
                }).then(function(person){
                  var sessionVariables = {
                    company_id: company.get('id'),
                    company_name: company.get('name'),
                    privilege:companyRelationship.get('privilege'),
                    name: person.get('firstName')+' '+person.get('lastName')
                  }
                  session.set('sessionVariables', sessionVariables);
                }).catch(function(reason){
                  reject('user does not have records correctly setup.'+ reason);
                });
                resolve(true);
              } else {
                reject('user does not have access to this company');
              }
          });
        } else {
          reject('company does not exist');
        }

      })
    });
    return promise;
  }
});
