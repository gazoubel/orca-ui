import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),

  model: function () {
    var ref = this;
    var company = this.modelFor('company');

    var privilege = ref.store.createRecord('privilege', {
      company: company
    });

    return Ember.RSVP.hash({
      privilege: privilege
    });
  },
  setupController: function(controller, model) {
    controller.set('privilege', model.privilege);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.privilege');
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.administration.privileges');
      return false;
    },
    canceled(){
      this.transitionTo('company.administration.privileges');
    },
    willTransition(transition) {
      var privilege = this.controller.get('privilege');
      if (project.get('hasDirtyAttributes') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        privilege.rollbackAttributes();
        return true;
      }
    }
  }
});


// import Ember from 'ember';
//
// export default Ember.Route.extend({
//   session: Ember.inject.service('session'),
//   intl: Ember.inject.service(),
//   model: function () {
//     var ref = this;
//     var company = this.modelFor('company');
//
//     var privilege = ref.store.createRecord('privilege', {
//       company: company
//     });
//
//     return Ember.RSVP.hash({
//       privilege: privilege
//     });
//   },
//   setupController: function(controller, model) {
//     controller.set('privilege', model.privilege);
//   },
//
//   actions: {
//     save(privilege){
//       var _ref = this;
//
//       if (!privilege.get('validations.isValid')) {
//         _ref.get('appManager').notify('error', privilege.get('validations.messages'));
//         return;
//       }
//       return privilege.save().then(function(){
//         var t_model = _ref.get('intl').t('models.privilege');
//         var message = _ref.get('intl').t('product.messages.model_created',{model: t_model});
//         _ref.get('appManager').notify('success', message);
//         _ref.transitionTo('company.administration.privileges');
//         return false;
//       }).catch(function(reason){
//         _ref.get('appManager').notify('error', reason);
//       });
//     },
//     cancel(privilege) {
//       privilege.rollbackAttributes();
//       this.transitionTo('company.administration.privileges');
//     },
//     willTransition(transition) {
//       var privilege = this.controller.get('privilege');
//       if (privilege.get('hasDirtyAttributes') &&
//           !confirm('Are you sure you want to abandon progress?')) {
//         transition.abort();
//       } else {
//         // Bubble the `willTransition` action so that
//         // parent routes can decide whether or not to abort.
//         privilege.rollbackAttributes();
//         return true;
//       }
//     }
//   }
// });
