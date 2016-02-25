import Ember from 'ember';

export default Ember.Controller.extend({
	cashDrawerBalance: 0,
	actions: { 
		postCashDrawerBalance: function() {
			var today = new Date();
			$.ajax({ 
				type: "POST",
				url: "https://script.google.com/macros/s/AKfycbznQU4gCVWD5vvOkDvijjL3qZ4fssBuI0XwvriDgxecUpVwkXo/exec",
				data: { funcName: "SetCashDrawerBalance", DayOfPost: today, CashDrawerBOD: this.cashDrawerBalance}
			});
			this.get('target').send('closeModal');
		}
	}
});
