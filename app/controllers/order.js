//-- controllers/order.js --//

import Ember from 'ember';

//-- This line was 'Ember.Controller.extend' and was NOT working, the resulting orderline wasn't showing --//
export default Ember.ObjectController.extend({
	needs: "application",
	toggleDiscount: false,
	formColSpan: 5,
	hennaArtists: ["Deb","Jasmine","Kelly","Isabel","Rico"],
	hennaColSpan: function() {
		if (!this.model.get('orderHasHenna') && !this.get('toggleDiscount')) this.set('formColSpan', 5);
		if (this.model.get('orderHasHenna') && !this.get('toggleDiscount')) this.set('formColSpan', 6);
		if (!this.model.get('orderHasHenna') && this.get('toggleDiscount')) this.set('formColSpan', 6);
		if (this.model.get('orderHasHenna') && this.get('toggleDiscount')) this.set('formColSpan', 7);
		/*if (this.get('orderHasHenna'))
			if (this.get('formColSpan') < 6)
				this.set('formColSpan', this.get('formColSpan') + 1);
		else
			if (this.get('formColSpan') > 5)
				this.set('formColSpan', this.get('formColSpan') - 1);*/
	}.observes('orderHasHenna'),
	multipleLines: Ember.computed('orderlines.[]', {
		get() {
			return this.model.get('orderlines').get('length') > 1;
		}
	}),
	newOrderNumber: function() {
		var today = new Date();
		var day = ("" + today.getDay()).length === 1 ? "0" + today.getDay() : "" + today.getDay();
		var month = ("" + today.getMonth()).length === 1 ? "0" + today.getMonth() : "" + today.getMonth();
		var hour = ("" + today.getHours()).length === 1 ? "0" + today.getHours() : "" + today.getHours();
		var minutes = ("" + today.getMinutes()).length === 1 ? "0" + today.getMinutes() : "" + today.getMinutes();
		var seconds = ("" + today.getSeconds()).length === 1 ? "0" + today.getSeconds() : "" + today.getSeconds();
		return day + month + today.getYear() + "_" + hour + minutes + seconds;
	},
	actions: {
		completeOrder: function() {
			console.log('validation check here?');
			return true;
		},
		toggleDiscount: function() {
			this.set('toggleDiscount', !this.get('toggleDiscount'));
			var formColSpan = this.get('formColSpan');
			if (this.get('toggleDiscount'))
				this.set('formColSpan', formColSpan += 1);
			else
				this.set('formColSpan', formColSpan += -1);
		},
		newOrder: function(){
			var ordersById = this.model.get('orders');
			var nextId = 1;
			if (ordersById !== undefined){
				ordersById = ordersById.mapBy('id');
				nextId = Math.max(...ordersById) + 1;
			}

			var newOrderNumber = this.get('newOrderNumber').call(this);
			var newOrder = this.store.createRecord('order',{id: nextId, orderNumber: newOrderNumber});
			//newOrder.save();
			this.model.set('orders', newOrder);

			var orderLinesByID = this.model.get('orderlines');
			var nextOrderlineId = 1;
			if (orderLinesByID !== undefined) {
				orderLinesByID = orderLinesByID.mapBy('id');
				nextOrderlineId = Math.max(...orderLinesByID) + 1;
			}

			var newOrderLine = this.store.createRecord('orderline',{id: nextOrderlineId, quantity: 1, cost: 0});
			newOrderLine.save();
		},
		newOrderLine: function(){
			var orderLinesByID = this.model.get('orderlines');
			var nextId = 1;
			if (orderLinesByID !== undefined) {
				orderLinesByID = orderLinesByID.mapBy('id');
				nextId = orderLinesByID.length === 0 ? 1 : Math.max(...orderLinesByID) + 1;
			}

			var newOrderLine = this.store.createRecord('orderline',{id: nextId, quantity: 1, cost: 0, discount: 0});
			//newOrderLine.save();

			this.store.find('order', 1).then(function(order) {
				newOrderLine.set('order', order);
				//order.save();
			});
		}
	}
});
