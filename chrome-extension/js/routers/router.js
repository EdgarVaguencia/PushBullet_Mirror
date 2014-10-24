var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    PushCollection = require('../collections/push'),
    PushModel = require('../models/push'),
    PushViewList = require('../views/pushes'),
    SignInView = require('../views/signin');

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
      this.getKey();
    }
    //this.connect();
  },

  timeLine : function(){
    console.log("Directo timeLine");
    if( typeof localStorage.keyCode != 'undefined' ){
      this.PushList.viewTimeLine();
    }else{
      this.signIn();
    }
  },

  connect : function(){
    var self = this;
    if( typeof this.key != 'undefined' && this.key.length > 0 ){
      this.websocket = new WebSocket('wss://stream.pushbullet.com/websocket/'+self.key);
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
        localStorage['WebSocket'] = false;
        self.websocketClose(e);
      }
    }else{
      _.delay(function(){
        self.getKey();
      }, 5000, this);
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
    }else{
      console.log( json );
    }
  },

  websocketError : function(e){
    console.log('WebSocket Error '+e);
  },

  websocketClose : function(e){
    console.log('WebSocket Close');
    this.main();
  },

  signIn : function(){
    var signinView = new SignInView({});
    signinView.render();
  },

  getKey : function(){
    console.log("sin key");
    var self = this;
    chrome.cookies.get({ url : 'https://www.pushbullet.com', name : 'api_key' },function(cookie){
      if( cookie && cookie.value.length > 0 ){
        localStorage['keyCode'] = cookie.value;
        self.key = localStorage.keyCode;
      }
    });
    this.connect();
  }

});
