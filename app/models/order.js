//-- models/order --//

import DS from 'ember-data';

var order = DS.Model.extend({
  orderNumber: DS.attr('string'),
  customerName: DS.attr('string'),
  customerEmail: DS.attr('string'),
  zipCode: DS.attr('string'),
  salesClerk: DS.attr('string'),
  paymentType: DS.attr('string'),
  orderTotal: DS.attr('number'),
  orderlines: DS.hasMany('orderline'),
  orderIsDiscounted: function () {
	  let orderIsDiscounted = false;
	  this.get('orderlines').forEach(function(orderline) { if (orderline.get('discount') !== undefined && orderline.get('discount') !== "") orderIsDiscounted = true; });
	  return orderIsDiscounted;
  }.property('orderlines.@each.discount'),
  orderHasHenna: function() {
	let orderHasHenna = false;
	this.get('orderlines').forEach(function(orderline) { if (orderline.get('category') === "Henna") orderHasHenna = true;});
	return orderHasHenna;
  }.property('orderlines.@each.category')
});

export default order;
