import Ember from 'ember';

export default Ember.Component.extend({
  //--put properties in here, make sure to add .property() to end of function
  productCategories: ["Jewelry","Henna","Shoes","Books","Clothing","Gifts"],
  theInvalidLine: true,
  actions: {
	removeOrderLine: function(param) {  
		this.get('targetObject.store').find('orderline',param).then( function(foundOrderLine) { foundOrderLine.destroyRecord();});
	}
  }
});
