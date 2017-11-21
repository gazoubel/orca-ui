import Ember from 'ember';

export default Ember.Route.extend({
//   session: Ember.inject.service('session'),
//   intl: Ember.inject.service(),
//   model: function (params) {
//     return this.modelFor('company.administration.people.person').reload();
//   },
//   setupController: function(controller, model) {
//     controller.set('person', model);
//   },
//   actions: {
//     added(){
//       var t_model = this.get('intl').t('models.person');
//       var message = this.get('intl').t('product.messages.model_updated',{model: t_model});
//       this.get('appManager').notify('success', message);
//       this.transitionTo('company.administration.people.person');
//       return false;
//     },
//     canceled(){
//       this.get('appManager').notify('success', this.get('intl').t('product.administration.people.person.information_rolledback'));
//       this.transitionTo('company.administration.people.person');
//     },
//     willTransition(transition) {
//       var person = this.controller.get('person');
//       if (person.get('hasDirtyAttributes') &&
//           !confirm('Are you sure you want to abandon progress?')) {
//         transition.abort();
//       } else {
//         // Bubble the `willTransition` action so that
//         // parent routes can decide whether or not to abort.
//         person.rollbackAttributes();
//         return true;
//       }
//     }
//   }
});
