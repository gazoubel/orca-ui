export function initialize(instance) {
  const applicationRoute = instance.lookup('route:application');
  const session          = instance.lookup('service:session');
  // var   currentAcronym;
  session.on('authenticationSucceeded', function() {
    // var currentAcronym = this.get('session.sessionVariables.company_acronym');
    // this.set('currentAcronym', currentAcronym);
    // applicationRoute.transitionTo('company.index');
  });
  session.on('invalidationSucceeded', function() {
    // var currentAcronym = this.get('currentAcronym');
    // this.set('currentAcronym', null);
    // applicationRoute.transitionTo('public.company', currentAcronym);
    // applicationRoute.transitionTo('company', currentAcronym);
  });
}

export default {
  initialize,
  name:  'session-events',
  after: 'ember-simple-auth'
};
