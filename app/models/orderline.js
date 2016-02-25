//-- model/orderline.js --//

import DS from 'ember-data';
//import currency from 'currency';

var orderline = DS.Model.extend({  
  quantity: DS.attr('number'),
  category: DS.attr('string'), 
  cost: DS.attr('number'),
  discount: DS.attr('number'),
  discountAmount: function() {
	return (this.get('discount') >= 1 && this.get('discount') <= 100) ? ((this.get('quantity') * this.get('cost')) * (this.get('discount') / 100)) : 0;
  }.property('discount','cost','quantity'),
  tax: function() {
	let taxRate = this.get('category') === 'Henna' ? 0 : 0.093;
	let lineTotal = this.get('quantity') * this.get('cost') - this.get('discountAmount');
    return Math.round((lineTotal * taxRate) * 100) / 100;
  }.property('cost','quantity','discount','category'),
  total: function() {  
	let total = this.get('cost') * this.get('quantity') + this.get('tax') - this.get('discountAmount'); 
	return Math.round(total * 100) / 100;
  }.property('cost','quantity','discount','category'),
  order: DS.belongsTo('order') 
});

export default orderline;
