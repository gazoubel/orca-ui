import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    var stageModel = this.modelFor('company.projects.project.stages.stage');
    return stageModel.projectStage;
  },
  setupController: function(controller, model) {
    controller.set('paycheckItems', model.get('paycheckItems'));
    // return model.get('paycheckItems');
    // return model.get('paycheckItems').then(function(items){
    //   var arr = Ember.A();
    //   items.forEach(function(item, index) {
    //     item.get('laborItem').then(function(paymentItem){
    //       arr.addObject({
    //         id: item.get('paycheck.id'),
    //         name: item.get('paycheck.person.firstname') +' as '+paymentItem.get('name'),
    //         total:item.get('total'),
    //         quantity:item.get('quantity')});
    //     });
    //   });
    //   return arr;
      // controller.set('purchasedItems', arr);
    // })
  },
});
