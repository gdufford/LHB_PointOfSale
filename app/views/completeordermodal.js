import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		//Ember.$("option:contains('Return - ')").css("color","red").css("font-style","italic"); //Being set initially, but reverts after selection is made
	}
});
