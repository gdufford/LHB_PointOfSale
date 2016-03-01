//-- models/order --//

import DS from 'ember-data';

var order = DS.Model.extend({
	orderNumber: DS.attr('string'),
	customerName: DS.attr('string'),
	customerEmail: DS.attr('string'),
	
	zipCode: DS.attr('string'),
	invalidZipCode: function() {
		return (this.get('zipCode') === undefined || this.get('zipCode').length !== 5) ? true : false;
	}.property('zipCode'),
	
	salesClerk: DS.attr('string'),
	invalidSalesClerk: function() {
		return this.get('salesClerk') === undefined || this.get('salesClerk') === "" || this.get('salesClerk') == null;
	}.property('salesClerk'),
	
	paymentType: DS.attr('string'),
	invalidPaymentType: function() {
		return this.get('paymentType') === undefined || this.get('paymentType') === "" || this.get('paymentType') == null;
	}.property('paymentType'),
	
	orderTotal: DS.attr('Number'),
	orderTotalCalc: function() {
		let orderTotalVar = 0;
		this.get('orderlines').forEach(function(orderline) {
			orderTotalVar += orderline.get('total');
		});
		this.set('orderTotal', Math.round(orderTotalVar * 100) / 100);
	}.observes('orderlines.@each.total'),
	
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
		if (this.get('invalidZipCode') || this.get('invalidSalesClerk') || this.get('invalidPaymentType')) return true;
		
		let anyInvalidLine = false;
		this.get('orderlines').forEach(function(line) {
			if (line.get('invalidQuantity')|| line.get('invalidCost') || line.get('invalidCategory') || line.get('invalidHennaArtist') || line.get('invalidDiscount')) anyInvalidLine = true;
		});
		return anyInvalidLine;
	}.property('orderlines.@each.total','invalidZipCode','invalidSalesClerk','invalidPaymentType')
});

export default order;
