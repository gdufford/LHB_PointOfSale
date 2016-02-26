import Ember from 'ember';

export default Ember.Controller.extend({
	cashDrawerBalance: 0,
	disabledEmail: true,
	disabledPrinting: true,
	printReceipt: false,
	emailReceipt: false,
	enablePrintingFields: function() {
		this.set('disabledPrinting', !this.get('printReceipt'));
	}.observes('printReceipt'),
	couponSelections: ['10% off next order','Free $5 Henna','Free foot rub'],
	enableEmailField: function() { 
		this.set('disabledEmail', !this.get('emailReceipt'));
	}.observes('emailReceipt'),
	completeOrderEmail: Ember.computed.oneWay('model.customerEmail'),
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
