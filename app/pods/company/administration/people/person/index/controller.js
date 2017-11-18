import Ember from 'ember';

export default Ember.Controller.extend({
  // registration: Ember.inject.service(),
  // newUser: {},
  // emailIsTaken:false,
  // checkEmailTaken: Ember.observer('newUser.email', function(){
  //   this.get('registration').emailTaken(this.get('newUser.email'))
  //     .then((res) => {
  //       Ember.run(this, function() {
  //         if (res === true) {
  //           this.set('emailIsTaken', true);
  //         } else {
  //           this.set('emailIsTaken', false);
  //         }
  //       });
  //     });
  // }),
  // passwordMatches: Ember.computed('newUser.passwordConfirmation','newUser.password', function(){
  //   if (!this.get('newUser.password') || this.get('newUser.password')==='') {
  //     return false;
  //   }
  //   return this.get('newUser.passwordConfirmation')===this.get('newUser.password');
  // }),
  // buttonDisabled: Ember.computed('emailIsTaken','passwordMatches', function(){
  //   return this.get('emailIsTaken') ||
  //       !this.get('passwordMatches');
  // }),
  userMainInfoImgStyle: Ember.computed('person.user', function(){
    return this.get('person.user')?'padding-left:15px;':'';
  }),
  actions: {
    // doRegisterNewUserAndAssignCompany(newUser, person_id){
    //   this.get('registration').registerNewUserAndAssignCompany(newUser, person_id)
    //   .then(
    //     (res)=>{
    //       this.get('person').reload();
    //       alert('registered'+res);
    //     },
    //     (xhr, status,error)=>{
    //       alert('err:'+xhr.responseText+status+error);
    //     }
    //   );
    // }
  }
});
