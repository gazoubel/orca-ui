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
    var _this = this;
    if(status === 400 && payload.Errors){
      var error = new DS.AdapterError(payload.Errors);
      var message = "";
      Object.keys(payload.Errors).forEach(function(key){
        var thisKeyErrors = payload.Errors[key];
        Object.keys(thisKeyErrors).forEach(function(errorIndex){
          var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);
          var thisMessage=thisKeyErrors[errorIndex].message.replace(' ', '_');
          var entity = inflector.singularize(requestData.url.replace(_this.host + '/' + _this.namespace + '/', ''));
          var t_entity = _this.get('intl').t('product.errors.'+entity);
          var t_field = _this.get('intl').t('product.errors.'+entity+'_'+key);
          message+= _this.get('intl').t('product.errors.'+thisMessage, {entity: t_entity, field: t_field});
        });
      });
      error.detailedMessage = message;
      return error;
      // return new DS.ApplicationError();
    }
    return this._super(...arguments);
  }
});
