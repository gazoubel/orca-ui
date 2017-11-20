import Ember from 'ember';

export default Ember.Helper.extend({
  session: Ember.inject.service(),
  compute: function(params, options) {
    let path = params[0];
    if(!path)
      return;

    var person = self.get('session.sessionVariables.person');
    var isAdmin = person.get('isAdmin');
    if (isAdmin) {
      isAdmin;
    } else {
      return person.get('privilege').then(function(privilege){
        var hasAccess = privilege.get(path);
        return hasAccess;
      });
    }
  }
});

// export function checkUserAccessFor(params/*, hash*/) {
//   return params;
// }
//
// export default Ember.Helper.helper(checkUserAccessFor);
