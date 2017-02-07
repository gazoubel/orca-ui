import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('registration');

  this.route('company', {
    path: ':company_acronym'
  }, function() {
    this.route('login');
    this.route('administration', function() {
      this.route('stages');
      this.route('providers');
      this.route('payment-types');
    });
  });
});

export default Router;
