import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
  	removeOrderLine: function(param) {
  		this.get('targetObject.store').find('orderline',param).then( function(foundOrderLine) { foundOrderLine.destroyRecord(); });
  	}
  }
});
