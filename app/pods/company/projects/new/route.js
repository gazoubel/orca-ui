import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  model: function () {
    // var company_id = this.get('session.sessionVariables.company_id');
    var ref = this;
    var sessionVariables = ref.get('session.sessionVariables');
    return ref.get('store').findRecord('company', sessionVariables.company_id)
    .then(function(company){
      var project = ref.store.createRecord('project', {
        company: company
      });
      return project;
    });

    // return this.store.findAll('item-type', {company: company_id});
  },
  setupController: function(controller, model) {
    controller.set('project', model);
  },

  actions: {
    save(project) {
      var ref = this;

      if (!project.get('validations.isValid')) {
        ref.get('appManager').notify('error', project.get('validations.messages'));
        return;
      }
      return project.save().then(function(){
        var t_model = ref.get('intl').t('models.project');
        var message = ref.get('intl').t('product.messages.model_created',{model: t_model});
        ref.get('appManager').notify('success', message);
          // ref.sendAction('onSave', projectStage);
      }).catch(function(reason){
        ref.get('appManager').notify('error', reason);
        // this.set('mostrarErro', true);
      });
    },
    cancel(project) {
      project.rollbackAttributes();
      this.transitionTo('company.projects');
    }
  }
});
