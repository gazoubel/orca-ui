import Ember from 'ember';

export default Ember.Component.extend({
  registration: Ember.inject.service(),
  privileges: {},
  person: null,
  newUser: {},
  emailIsTaken:false,
  checkEmailTaken: Ember.observer('newUser.email', function(){
    this.get('registration').emailTaken(this.get('newUser.email'))
      .then((res) => {
        Ember.run(this, function() {
          if (res === true) {
            this.set('emailIsTaken', true);
          } else {
            this.set('emailIsTaken', false);
          }
        });
      });
  }),
  passwordMatches: Ember.computed('newUser.passwordConfirmation','newUser.password', function(){
    if (!this.get('newUser.password') || this.get('newUser.password')==='') {
      return false;
    }
    return this.get('newUser.passwordConfirmation')===this.get('newUser.password');
  }),
  buttonDisabled: Ember.computed('emailIsTaken','passwordMatches', 'person.privilege', 'person.isAdmin', function(){
    return this.get('emailIsTaken') ||
        !this.get('passwordMatches') ||
        (!this.get('person.isAdmin') && (!this.get('person.privilege.id')));
  }),
  buttonUpdateDisabled: Ember.computed('person.privilege', 'person.isAdmin', function(){
    return (!this.get('person.isAdmin') && (!this.get('person.privilege.id')));
  }),
  actions: {
    startUpdating(){
      this.set('isUpdating', true);
    },
    stopUpdating(){
      this.get('person').rollbackAttributes();
      this.set('isUpdating', false);
    },
    updatePrivilege(person){
      var ref = this;
      if (person.get('isAdmin')) {
        person.set('privilege', null);
      }
      person.save().then(function(){
        ref.set('isUpdating', false);
      });
    },
    doRegisterNewUserAndAssignCompany(newUser, person){
      var ref = this;
      if (person.get('isAdmin')) {
        person.set('privilege', null);
      }
      person.save().then(function(){
        ref.get('registration').registerNewUserAndAssignCompany(newUser, person.get('id'))
        .then(
          (res)=>{
            ref.get('person').reload();
            alert('registered'+res);
          },
          (xhr, status,error)=>{
            alert('err:'+xhr.responseText+status+error);
          }
        );
      })

    }
  }

});
