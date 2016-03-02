import Ember from 'ember';

export default Ember.Controller.extend({
	cashDrawerBalance: 0,
	disabledEmail: true,
	clerkNames: ["Deb","Jasmine","Kelly","Layne","Isabel","Garry","Other"],
	payMethods: ["Cash","Check","Credit"],
	disabledPrinting: true,
	printCoupon: false,
	badCoupon: false,
	disabledCoupon: true,
	printReceipt: false,
	emailReceipt: false,
	badEmail: function() {
		if (this.get('emailReceipt') && (this.get('completeOrderEmail') === undefined || this.get('completeOrderEmail') === null || this.get('completeOrderEmail') === "" || this.get('completeOrderEmail').indexOf('@') <= 0 )) {
			return true;
		} else {
			return false;
		}
	}.property('emailReceipt','completeOrderEmail'),
	enableCouponSelect: function() {
		this.set('disabledCoupon', !this.get('printCoupon'));
		if (!this.get('printCoupon')) this.set('couponSelection',"");
	}.observes('printCoupon'),
	enablePrintingFields: function() {
		if (!this.get('printReceipt') ) {
			this.set('couponSelection',"");
			this.set('printExtraReciept', false);
			this.set('printCoupon', false);
		}
		this.set('disabledPrinting', !this.get('printReceipt'));
	}.observes('printReceipt'),
	couponSelections: ['10% off next order','Free $5 Henna','Free foot rub'],
	invalidCouponSelection: function() {
		if (this.get('printCoupon') && (this.get('couponSelection') === undefined || this.get('couponSelection') === "" || this.get('couponSelection') == null))
			this.set('badCoupon', true);
		else {
			this.set('badCoupon', false);
		}
	}.observes('couponSelection','printCoupon'),
	enableEmailField: function() {
		this.set('disabledEmail', !this.get('emailReceipt'));
	}.observes('emailReceipt'),
	actions: {
		postCashDrawerBalance: function() {
			var today = new Date();
			$.ajax({
				type: "POST",
				url: "https://script.google.com/macros/s/AKfycbznQU4gCVWD5vvOkDvijjL3qZ4fssBuI0XwvriDgxecUpVwkXo/exec",
				data: { funcName: "SetCashDrawerBalance", DayOfPost: today, CashDrawerBOD: this.cashDrawerBalance}
			});
			this.get('target').send('closeModal');
		},
		persistToLocalStorage () {
			//debugger;
			this.store.find('orderline').then(function(orderlines){
				orderlines.forEach(function(orderline) { orderline.save(); });
			});

			this.store.find('order').then(function(order) {
				order.save();
			});
		}
	}
});
