var Backbone = require('backbone'),
    PushView = require('../views/push'),
    $ = require('jquery');

module.exports = Backbone.View.extend({
  el : $('body'),

  initialize : function(){
    this.listenTo(this.collection,'add',this.addCount,this);
    this.listenTo(this.collection,'remove',this.render,this);
  },

  addNew : function(push){
    var pushView = new PushView({model : push});
    $('#body').append(pushView.render().el);
  },

  render : function(){
    //console.log(this.collection.toJSON());
    var pushes = [],
        self = this;
    this.collection.forEach(function(push){
      pushes.push(push.toJSON());
    });
    localStorage.pushes = JSON.stringify(pushes);
  },

  viewTimeLine : function(){
    if( this.collection.length > 0 ){
      this.collection.forEach(this.addNew,this);
    }else{
      console.log(this.collection);
      console.log(this.collection.models);
    }
    /*if( localStorage.pushes ){
      var pushes = JSON.parse(localStorage.pushes),
          self = this;
      console.log(this.collection);
      this.collection.reset();
      console.log(this.collection);
      $.each(pushes,function(k,i){
        self.addNew(i);
      });
    }*/
    if( this.collection.length == 0 ){
        this.collection.reset( JSON.parse(localStorage.pushes) );
    }
    this.minusCount();
  },

  addCount : function(){
      console.log("addCount");
    if ( localStorage.count ){
      this.count = localStorage.count;
    }else{
      this.count = 0;
    }
    this.count += 1;
    this.setBadge();
    this.render();
  },

  minusCount : function(){
    if ( localStorage.count ){
      this.count = localStorage.count;
    }
    this.count = '';
    this.setBadge();
  },

  setBadge : function(){
    var self = this;
    chrome.browserAction.setBadgeText({
      text : self.count.toString()
    });
    localStorage.count = ( typeof this.count == 'string') ? 0 : this.count;
  },

});
