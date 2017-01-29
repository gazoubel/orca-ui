import Ember from 'ember';

export default Ember.Controller.extend({
  registration: Ember.inject.service(),
  newRegistration: {},
  acronymIsValid: false,
  emailIsValid:false,

  checkAcronymTaken: Ember.observer('newRegistration.companyAcronym', function(){
    this.get('registration').acronymTaken(this.get('newRegistration.companyAcronym'))
      .then((res) => {
        Ember.run(this, function() {
          if (res === true) {
            this.set('acronymIsValid', false);
          } else {
            this.set('acronymIsValid', true);
          }
        });
      });
  }),
  checkEmailTaken: Ember.observer('newRegistration.email', function(){
    this.get('registration').emailTaken(this.get('newRegistration.email'))
      .then((res) => {
        Ember.run(this, function() {
          if (res === true) {
            this.set('emailIsValid', false);
          } else {
            this.set('emailIsValid', true);
          }
        });
      });
  }),
  passwordMatches: Ember.computed('newRegistration.passwordConfirmation','newRegistration.password', function(){
    if (!this.get('newRegistration.password') || this.get('newRegistration.password')=='') {
      return false;
    }
    return this.get('newRegistration.passwordConfirmation')==this.get('newRegistration.password');
  }),
  buttonDisabled: Ember.computed('acronymIsValid','emailIsValid','passwordMatches', function(){
    return !this.get('acronymIsValid') ||
        !this.get('emailIsValid') ||
        !this.get('passwordMatches');
  }),
  actions: {
    doRegister(newRegistration){
      this.get('registration').send(newRegistration)
      .then(
        (res)=>{
          alert('registered');
        },
        (xhr, status,error)=>{
          alert('err:'+xhr.responseText);
        }
      );
    }
  }
});
