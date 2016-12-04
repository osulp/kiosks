// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//
//= require action_cable
//= require_self
//= require_tree ./channels

(function() {
  this.App || (this.App = {});

  // TODO: pass in Rails.application.config.action_cable.url to createConsumer?
  App.cable = ActionCable.createConsumer();

}).call(this);
