import Ember from 'ember';

const AccessComponent = Ember.Component.extend({
  company: Ember.inject.service(),
  // session: Ember.inject.service(),
  tagName: "",
  canUserSeeBlock: Ember.computed('params.[]', function(){
    var params = this.get('params');
    return this.get('company').checkUserAccessFor(params?params[0]:null);
    // var self = this;
    // return DS.PromiseObject.create({
    //   promise: new Ember.RSVP.Promise(function(resolve){
    //     if (!self.get('params') || !self.get('params')[0]) {
    //       resolve(false);
    //     }
    //
    //     var person = self.get('session.sessionVariables.person');
    //
    //     var path = self.get('params')[0];
    //     var isAdmin = person.get('isAdmin');
    //     if (isAdmin) {
    //       resolve(isAdmin);
    //     } else {
    //       person.get('privilege').then(function(privilege){
    //         var hasAccess = privilege.get(path);
    //         return hasAccess;
    //       }).then(function(hasAccess){
    //         resolve(hasAccess);
    //       });
    //     }
    //   })
    // });

  })
});

AccessComponent.reopenClass({
  positionalParams: 'params'
});

export default AccessComponent;
