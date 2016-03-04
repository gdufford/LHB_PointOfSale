import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('order', function(){
    this.route('completeorder');
  });
});

export default Router;
