export function initialize(instance) {
  const applicationRoute = instance.lookup('route:application');
  const session          = instance.lookup('service:session');
  session.on('authenticationSucceeded', function() {
    applicationRoute.transitionTo('company.index');
  });
  session.on('invalidationSucceeded', function() {
    applicationRoute.transitionTo('company.index');
  });

export default {
  initialize,
  name:  'session-events',
  after: 'ember-simple-auth'
};
