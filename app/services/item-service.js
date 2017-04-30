import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service('session'),
  intl: Ember.inject.service(),
  store: Ember.inject.service(),
  add: function (name){
    var store = this.get('store');
    var intl = this.get('intl');
    var sessionVariables = this.get('session.sessionVariables');

    let promise = new Ember.Promise(function(resolve, reject) {
      store.findRecord('company', sessionVariables.company_id).then(function(company){
        var item = store.createRecord('item', {
          name: name,
          company: company
        });

        if (!item.get('validations.isValid')) {
          item.rollbackAttributes();
          reject(item.get('validations.messages'));
          return;
        }

        item.save().then(function(item) {
            var t_model = intl.t('models.item');
            var message = intl.t('product.messages.model_created',{model: t_model});
            resolve({item: item, message:message});
            return;
        }, function(error){
          reject(error.detailedMessage);
          item.rollbackAttributes();
        }).catch(function(reason){
          item.rollbackAttributes();
          reject("Error creating stage:" + reason);
        });
      });
    });

    return promise;
  },
  remove: function (item){
    return item.destroyRecord();
  }
});
