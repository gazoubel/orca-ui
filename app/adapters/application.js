import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  coalesceFindRequests: true,
  namespace: config.namespace,
  host: config.host,
  // namespace: 'api/v1',
  // host: 'http://localhost:1337',
  authorizer: 'authorizer"token'
});
