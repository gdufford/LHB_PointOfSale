import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    //this.transitionTo('order');
  },
  redirect: function() {
    this.transitionTo('order'); //different way to redirect, seems cleaner
  }
});
