import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    var stageModel = this.modelFor('company.projects.project.stages.stage');
    return stageModel.projectStage;
  },
  setupController: function(controller, model) {
    controller.set('paymentTransactionItems', model.get('paymentTransactionItems'));
    // return model.get('paymentTransactionItems');
    // return model.get('paymentTransactionItems').then(function(items){
    //   var arr = Ember.A();
    //   items.forEach(function(item, index) {
    //     item.get('laborItem').then(function(paymentItem){
    //       arr.addObject({
    //         id: item.get('paymentTransaction.id'),
    //         name: item.get('paymentTransaction.person.firstname') +' as '+paymentItem.get('name'),
    //         total:item.get('total'),
    //         quantity:item.get('quantity')});
    //     });
    //   });
    //   return arr;
      // controller.set('purchasedItems', arr);
    // })
  },
});
