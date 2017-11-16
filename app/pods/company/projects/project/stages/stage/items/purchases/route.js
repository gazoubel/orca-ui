import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    var stageModel = this.modelFor('company.projects.project.stages.stage');
    return stageModel.projectStage;
  },
  setupController: function(controller, model) {
    return model.get('purchaseTransactionItems').then(function(items){
      var arr = Ember.A();
      items.forEach(function(item) {
        item.get('item').then(function(purchasedItem){
          arr.addObject({
            id: item.get('purchaseTransaction.id'),
            name: purchasedItem.get('name'),
            total:item.get('total'),
            quantity:item.get('quantity')});
        });
      });
      return arr;
      // controller.set('purchasedItems', arr);
    }).then(function(arr){
      model.get('defaultPurchaseTransactions').then(function(purchaseTransactions){
        purchaseTransactions.forEach(function(item) {
          var other = item.get('other');
          if (other) {
            arr.addObject({
              id: item.get('id'),
              name: 'Other',
              total: other,
              quantity:1});
          }
          var tax = item.get('tax');
          if (tax) {
            arr.addObject({
              id: item.get('id'),
              name: 'Tax',
              total: tax,
              quantity:''});
          }
        });
        return arr;
      }).then(function(arr){
        controller.set('purchasedItems', arr);
      });
    });
  },
});
