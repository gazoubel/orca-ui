import Ember from 'ember';

export default Ember.Helper.extend({
  session: Ember.inject.service(),
  compute: function(params, options) {
    // let value = params[0];
    // if(!value)
    //   return;
    //
    // var person = self.get('session.sessionVariables.person');
    //
    // var path = self.get('params')[0];
    // var isAdmin = person.get('isAdmin');
    // if (isAdmin) {
    //   resolve(isAdmin);
    // } else {
    //   person.get('privilege').then(function(privilege){
    //     var hasAccess = privilege.get(path);
    //     return hasAccess;
    //   }).then(function(hasAccess){
    //     resolve(hasAccess);
    //   });
    // }



  }
});

// export function checkUserAccessFor(params/*, hash*/) {
//   return params;
// }
//
// export default Ember.Helper.helper(checkUserAccessFor);
