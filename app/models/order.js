//-- models/order --//

import DS from 'ember-data';

var order = DS.Model.extend({
	orderNumber: DS.attr('string'),
	customerName: DS.attr('string'),
	customerEmail: DS.attr('string'),
	zipCode: DS.attr('string'),
	salesClerk: DS.attr('string'),
	paymentType: DS.attr('string'),
	orderTotal: function() {
		let orderTotalVar = 0;
		this.get('orderlines').forEach(function(orderline) {
			orderTotalVar += orderline.get('total');
		});
		return Math.round(orderTotalVar * 100) / 100;
	}.property('orderlines.@each.total'),
	orderlines: DS.hasMany('orderline'),
	orderIsDiscounted: function () {
		let orderIsDiscounted = false;
		this.get('orderlines').forEach(function(orderline) { if (Number(orderline.get('discount')) !== 0) orderIsDiscounted = true; });
		return orderIsDiscounted;
	}.property('orderlines.@each.discount'),
	orderHasHenna: function() {
		let orderHasHenna = false;
		this.get('orderlines').forEach(function(orderline) { if (orderline.get('category') === "Henna") orderHasHenna = true;});
		return orderHasHenna;
	}.property('orderlines.@each.category'),
	failValidation: function() {
		let anyInvalidLine = false;
		this.get('orderlines').forEach(function(line) {
			if (line.get('invalidQuantity')|| line.get('invalidCost') || line.get('invalidCategory') || line.get('invalidHennaArtist') || line.get('invalidDiscount')) anyInvalidLine = true;
		});
		return anyInvalidLine;
	}.property('orderlines.@each.total')
});

export default order;
