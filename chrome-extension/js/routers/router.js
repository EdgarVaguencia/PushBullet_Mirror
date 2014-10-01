var Backbone = require('backbone'),
    $ = require('jquery'),
    PushCollection = require('../collections/push'),
    PushModel = require('../models/push'),
    PushView = require('../views/push');

module.exports = Backbone.Router.extend({
  routes : {
    '' : 'main'
  },
  initialize : function(){
    Backbone.history.start();
  },
  main : function(){
    this.connect();
  },
  connect : function(){
    if(this.websocket != null){
      this.websocket.close();
    }
    this.websocket = new WebSocket('wss://stream.pushbullet.com/websocket/v1zVtLfrBTdQdfh0xThlJXb3W6tJ139SUUuju5vRCCUuW');
    this.websocket.onopen = function(e){
      this.websocketOpen(e);
    }
    this.websocket.onmessage = function(e){
      this.websocketMessage(e);
    }
    this.websocket.onerror = function(e){
      this.websocketError(e);
    }
    this.websocket.onclose = function(e){
      this.websocketClose(e);
    }
  },
  websocketOpen : function(e){
    console.log('WebSocket Open');
  },
  websocketMessage : function(e){
    console.log(e.data);
  },
  websocketError : function(e){
    console.log('WebSocket Error');
  },
  websocketClose : function(e){
    console.log('WebSocket Close');
  }
});
