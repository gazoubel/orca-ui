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
          .then(function(record) {
              if(record.get('length')>0){
                session.set('name', 'Fulano dos Grudes');
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
