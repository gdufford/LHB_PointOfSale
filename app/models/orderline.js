//-- model/orderline.js --//

import DS from 'ember-data';
//import currency from 'currency';

var orderline = DS.Model.extend({
	quantity: DS.attr('number'),
	invalidQuantity: function() {
		return this.get('quantity') <= 0 || !Number.isInteger(Number(this.get('quantity')));
	}.property('quantity'),
	//----------------------------------------------------------------------------//
	cost: DS.attr('number'),
	invalidCost: function() {
		return (this.get('cost') <= 0);
	}.property('cost'),
	//----------------------------------------------------------------------------//
	category: DS.attr('string'),
	invalidCategory: function() {
		return this.get('category') === undefined || this.get('category') === "" || this.get('category') === null;
	}.property('category'),
	//----------------------------------------------------------------------------//
	hennaArtist: DS.attr('string'),
	invalidHennaArtist: function() {
		return this.get('category') === 'Henna' && (this.get('hennaArtist') === undefined || this.get('hennaArtist') === "" || this.get('hennaArtist') === null);
	}.property('hennaArtist'),
	isHenna: function() {
		if (this.get('category') === 'Henna')
			return true;
		else
			return false;
	}.property('category'),
	//----------------------------------------------------------------------------//
	discount: DS.attr('number'),
	discountAmount: DS.attr('number'),
	invalidDiscount: function() {
		return this.get('discount') < 0 || this.get('discount') > 100;
	}.property('discount'),
	discountAmountCalc: function() {
		this.set('discountAmount', this.get('invalidDiscount') ? 0 : ((this.get('quantity') * this.get('cost')) * (this.get('discount') / 100)));
	}.observes('discount'),
	//----------------------------------------------------------------------------//
	tax: DS.attr('Number'),
	taxCalc: function() {
		let taxRate = this.get('category') === 'Henna' ? 0 : 0.093;
		let lineTotal = this.get('quantity') * this.get('cost') - this.get('discountAmount');
		this.set('tax', Math.round((lineTotal * taxRate) * 100) / 100);
	},
	//----------------------------------------------------------------------------//
	total: DS.attr('Number'),
	totalCalc: function() {
		//Calling these explicitly instead of using property or observer. It won't fire observer if value doesn't change
		this.discountAmountCalc();
		this.taxCalc();	//This was problematic when category was henna, as it kept the tax at 0, and wouldn't fire the observer of tax (totalCalc)

		let total = this.get('cost') * this.get('quantity') + this.get('tax') - this.get('discountAmount');
		this.set('total', Math.round(total * 100) / 100);
	}.observes('quantity','cost','category','discountAmount'),
	//----------------------------------------------------------------------------//
	order: DS.belongsTo('order')
});

export default orderline;
