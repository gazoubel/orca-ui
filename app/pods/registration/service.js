import Ember from 'ember';
import config from 'orca-ui/config/environment';

export default Ember.Service.extend({
  acronymTaken(acroym) {
    return Ember.$.get(config.host+'/'+config.namespace+'/auths/acronymExists?acronym=' + acroym);
  },

  emailTaken(email){
    return Ember.$.get(config.host+'/'+config.namespace+'/auths/emailExists?email=' + email);
  },

  send(newRegistration){
    return Ember.$.ajax({
      method: "POST",
      url: config.host+'/'+config.namespace+'/auths/registerNewCompany',
      dataType: 'json',
      data: {
        newRegistration: newRegistration
      }
    });
  }
});
