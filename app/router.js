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
      this.route('item-types');
      this.route('items');
    });
    this.route('projects', function() {
      this.route('new');

      this.route('project', {
        path: ':project_id'
      }, function() {
        this.route('edit');
        this.route('stages', function() {
          this.route('new');

          this.route('stage', {
            path: ':stage_id'
          }, function() {
            this.route('edit');
            this.route('info');
          });
        });
        this.route('info');
      });
    });
    this.route('transactions', function() {
      this.route('purchase-transactions', function() {
        this.route('new');
        this.route('purchase-transaction', {
          path: ':purchase_transaction_id'
        }, function() {
          this.route('edit');
          this.route('products', function() {
            this.route('new');

            this.route('product', {
              path: ':purchase_transaction_item_id'
            }, function() {
              this.route('edit');
            });
          });
        });
      });

      this.route('payment-transactions', function() {
        this.route('new');
      });
    });
  });
});

// Router.reopen({
//   doSomethingOnUrlChange: function() {
//     // console.log(this.get('currentPath'));
//     this.set('currentRoute', this.get('currentPath'));
//   }.on('didTransition')
// });

export default Router;
