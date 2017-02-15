import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    var ref = this;
    // var sessionVariables = ref.get('session.sessionVariables');
    var company_id = this.get('session.sessionVariables.company_id');
    return ref.get('store').findRecord('company', company_id)
    .then(function(company){
      var project = ref.store.createRecord('project', {
        company: company
      });
      return project;
    });
  },
  setupController: function(controller, model) {
    controller.set('project', model);
  },

  actions: {
    added(){
      var t_model = this.get('intl').t('models.project');
      var message = this.get('intl').t('product.messages.model_created',{model: t_model});
      this.get('appManager').notify('success', message);
      this.transitionTo('company.projects');
    },
    canceled(){
      this.transitionTo('company.projects');
    }
  }
});
