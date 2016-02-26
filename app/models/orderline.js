//-- model/orderline.js --//

import DS from 'ember-data';
//import currency from 'currency';

var orderline = DS.Model.extend({  
	quantity: DS.attr('number'),	
	invalidQuantity: function() { 
		//console.log('invalidQuantity check'); 
		return this.get('quantity') <= 0 || !Number.isInteger(Number(this.get('quantity')));
	}.property('quantity'),
	
	category: DS.attr('string'), 
	invalidCategory: function() { 
		//console.log('invalidCategory check'); 
		return this.get('category') === undefined || this.get('category') === "" || this.get('category') === null; 
	}.property('category'),
	
	cost: DS.attr('number'),
	invalidCost: function() { 
		console.log('invalidCost check'); 
		return (this.get('cost') <= 0); 
	}.property('cost'),
	
	discount: DS.attr('number'),
	invalidDiscount: function() { 
		//console.log('invalidDiscount check'); 
		return this.get('discount') < 0 || this.get('discount') > 100; 
	}.property('discount'),
	
	hennaArtist: DS.attr('string'),
	invalidHennaArtist: function() { 
		//console.log('invalidHennaArtist check'); 
		return this.get('category') === 'Henna' && (this.get('hennaArtist') === undefined || this.get('hennaArtist') === "" || this.get('hennaArtist') === null); 
	}.property('hennaArtist'),
	
	order: DS.belongsTo('order'),
	
	isHenna: function() {
		//console.log('isHenna check'); 
		if (this.get('category') === 'Henna')
			return true; 
		else
			return false;
	}.property('category'),
	
	discountAmount: function() {
		return this.get('invalidDiscount') ? 0 : ((this.get('quantity') * this.get('cost')) * (this.get('discount') / 100));
	}.property('discount','cost','quantity'),
	
	tax: function() {
		//console.log('tax recalc'); 
		let taxRate = this.get('category') === 'Henna' ? 0 : 0.093;
		let lineTotal = this.get('quantity') * this.get('cost') - this.get('discountAmount');
		return Math.round((lineTotal * taxRate) * 100) / 100;
	}.property('cost','quantity','discount','category'),
	
	total: function() {  
		//console.log('total recalc'); 
		let total = this.get('cost') * this.get('quantity') + this.get('tax') - this.get('discountAmount'); 
		return Math.round(total * 100) / 100;
	}.property('cost','quantity','discount','category','hennaArtist'), //Adding hennaArtist because even though it doesn't effect cost, this will fire validation check to re-enable buttons
});

export default orderline;
