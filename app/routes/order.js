//-- routes/order.js --//

import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    var newOrder = this.store.createRecord('order',{id: 1, orderNumber: '120315_111200'});
    newOrder.save();
		
	var newOrderLine = this.store.createRecord('orderline',{id: 1, quantity: 1, cost: 0});
    newOrderLine.save();

    this.store.find('order', 1).then(function(order) {
        newOrderLine.set('order', order);
        order.save();
    });
  },
  model: function() {
    return this.store.find('order',1);
    //return this.store.findAll('order'); //Frustrating, this won't work, but no error is thrown/indicated
  }, //Model initally empty, order is new, will need to change if a lookup mode is established
  actions: {
    completeOrder: function( toRender, passedModel) {
      this.controllerFor(toRender).set( 'model', passedModel );
      return this.render('completeordermodal', {
        into: 'application',
        outlet: 'modal'
      });
    },
	cashDrawer: function( toRender, passedModel) {
		this.controllerFor(toRender).set( 'model', passedModel );
		return this.render('cashdrawermodal', {
			into: 'application',
			outlet: 'modal'
		});
	},
    closeModal: function() {
		this.set('emailReceipt',false);
		return this.disconnectOutlet({
			outlet: 'modal',
			parentView: 'application'
      });
    }
  }
});
