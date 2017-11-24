import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    var stageModel = this.modelFor('company.projects.project.stages.stage');
    return stageModel.projectStage;
  },
  setupController: function(controller, model) {
    controller.set('laborTransactionItems', model.get('laborTransactionItems'));
    // return model.get('laborTransactionItems');
    // return model.get('laborTransactionItems').then(function(items){
    //   var arr = Ember.A();
    //   items.forEach(function(item, index) {
    //     item.get('laborItem').then(function(paymentItem){
    //       arr.addObject({
    //         id: item.get('laborTransaction.id'),
    //         name: item.get('laborTransaction.person.firstname') +' as '+paymentItem.get('name'),
    //         total:item.get('total'),
    //         quantity:item.get('quantity')});
    //     });
    //   });
    //   return arr;
      // controller.set('purchasedItems', arr);
    // })
  },
});
