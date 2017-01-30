import DS from 'ember-data';
import config from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  coalesceFindRequests: true,
  namespace: config.namespace,
  host: config.host,
  // namespace: 'api/v1',
  // host: 'http://localhost:1337',
  authorizer: 'authorizer:token'
});
