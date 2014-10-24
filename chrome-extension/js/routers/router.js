var Backbone = require('backbone'),
    $ = require('jquery'),
    PushCollection = require('../collections/push'),
    PushModel = require('../models/push'),
    PushViewList = require('../views/pushes');

module.exports = Backbone.Router.extend({

  routes : {
    '_generated_background_page.html' : 'main',
    'index.html' : 'timeLine'
  },

  initialize : function(){
    this.pushes = new PushCollection();
    this.PushList = new PushViewList({ collection : this.pushes });
    Backbone.history.start({ pushState : true });
  },

  main : function(){
    if( ! localStorage.keyCode ){
      chrome.cookies.get({ url : 'https://www.pushbullet.com', name : 'api_key' },function(cookie){
        if( cookie && cookie.value.length > 0 ){
          localStorage['keyCode'] = cookie.value;
        }
      });
    }
    this.connect( localStorage.keyCode );
  },

  timeLine : function(){
    console.log("Directo timeLine");
    this.PushList.viewTimeLine();
  },

  connect : function(key){
    var self = this;
    // if(this.websocket){
      // this.websocket.close();
    // }
    if( key.length > 0 ){
      this.websocket = new WebSocket('wss://stream.pushbullet.com/websocket/'+key);
      this.websocket.onopen = function(e){
        // localStorage['WebSocket'] = true;
        self.websocketOpen(e);
      }
      this.websocket.onmessage = function(e){
        self.websocketMessage(e);
      }
      this.websocket.onerror = function(e){
        self.websocketError(e);
      }
      this.websocket.onclose = function(e){
        localStorage['WebSocket'] = false;
        self.websocketClose(e);
      }
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
      json.created = Date(Date.now()*1000);
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
    console.log('WebSocket Error '+e);
  },

  websocketClose : function(e){
    console.log('WebSocket Close');
    this.main();
  },

});
