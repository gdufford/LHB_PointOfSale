import Ember from 'ember';

export default Ember.Controller.extend({
  taxRate: null,
  clerkNames: null,
  artistNames: null,
  productCategories: null,
  payMethods: null,
  coupons: null,
  init: function() {
    //Loading of app config from json file in assets.
    var controllerRef = this;
    Ember.$.getJSON("/assets/config.json").then(function(configData) {
      controllerRef.set('clerkNames', configData.configClerkNames);
      controllerRef.set('taxRate', configData.salesTaxRate);
      controllerRef.set('artistNames', configData.artistNames);
      controllerRef.set('productCategories', configData.categories);
      controllerRef.set('payMethods', configData.paymentMethods);
      controllerRef.set('coupons', configData.coupons);
    });
  },
});
