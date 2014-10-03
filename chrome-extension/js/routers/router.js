var Backbone = require('backbone'),
    $ = require('jquery'),
    PushCollection = require('../collections/push'),
    PushModel = require('../models/push'),
    PushViewList = require('../views/pushes');

module.exports = Backbone.Router.extend({
  routes : {
    '' : 'main'
  },
  initialize : function(){
    this.pushes = new PushCollection();
    this.PushList = new PushViewList({ collection : this.pushes });
    Backbone.history.start();
  },
  main : function(){
    this.connect();
  },
  connect : function(){
    var self = this;
    if(this.websocket != null){
      this.websocket.close();
    }
    this.websocket = new WebSocket('wss://stream.pushbullet.com/websocket/<access token>');
    this.websocket.onopen = function(e){
      self.websocketOpen(e);
    }
    this.websocket.onmessage = function(e){
      self.websocketMessage(e);
    }
    this.websocket.onerror = function(e){
      self.websocketError(e);
    }
    this.websocket.onclose = function(e){
      self.websocketClose(e);
    }
  },
  websocketOpen : function(e){
    console.log('WebSocket Open');
  },
  websocketMessage : function(e){
    var self = this;
    //console.log(e.data);
    var json = JSON.parse(e.data);
    if( json.type == 'push' && json.push.type !== 'dismissal' ){
      json.created = Date.now();
      if( !json.push.title ){
        json.push.title = 'Push';
      }
      if( !json.push.application_name ){
        json.push.application_name = 'PushBullet';
      }
      self.pushes.add(new PushModel(json));
    }
  },
  websocketError : function(e){
    console.log('WebSocket Error');
  },
  websocketClose : function(e){
    console.log('WebSocket Close');
  }
});
