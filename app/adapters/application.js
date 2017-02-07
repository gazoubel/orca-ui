import DS from 'ember-data';
import config from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import Ember from 'ember';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  intl: Ember.inject.service(),
  coalesceFindRequests: true,
  namespace: config.namespace,
  host: config.host,
  authorizer: 'authorizer:token',
  handleResponse: function(status, headers, payload, requestData){
    var intl = this.get('intl');
    if(status === 400 && payload.Errors){
      var error = new DS.AdapterError(payload.Errors);
      var message = "";
      Object.keys(payload.Errors).forEach(function(key){
        var thisKeyErrors = payload.Errors[key];
        Object.keys(thisKeyErrors).forEach(function(errorIndex){
          var errorMessageParts = thisKeyErrors[errorIndex].message.split('.');
          if (errorMessageParts.length>2) {
            var model = errorMessageParts[0];
            var field = errorMessageParts[1];
            var error = errorMessageParts[2];
            var t_model = intl.t('models.'+model);
            var t_field = intl.t('fields.'+field);
            message+= intl.t('errors.'+error, {model: t_model, field: t_field});
          } else {
            message+=thisKeyErrors[errorIndex].message;
          }
        });
      });
      error.detailedMessage = message;
      return error;
      // return new DS.ApplicationError();
    }
    return this._super(...arguments);
  }
});
