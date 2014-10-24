var Backbone = require('backbone'),
    PushModel = require('../models/push'),
    PushView = require('../views/push'),
    $ = require('jquery');

module.exports = Backbone.View.extend({
  el : $('body'),

  initialize : function(){
    this.listenTo(this.collection,'add',this.render,this);
  },

  addNew : function(push){
    var pushModel = new PushModel(push);
    var pushView = new PushView({model : pushModel});
    $('#body').append(pushView.render().el);
  },

  render : function(){
    if ( localStorage.pushes ){
      this.collection.reset(JSON.parse(localStorage.pushes))
    }
    this.collection.setSorting('created');
    this.collection.fullCollection.sort();
    localStorage.pushes = JSON.stringify(this.collection.toJSON());
    this.addCount();
  },

  viewTimeLine : function(){
    if( localStorage.pushes ){
      var pushes = JSON.parse(localStorage.pushes);
      var self = this;
      $.each(pushes,function(k,i){
        self.addNew(i);
      });
    }
    this.minusCount();
  },

  addCount : function(){
    if ( localStorage.count ){
      this.count = localStorage.count;
    }else{
      this.count = 0;
    }
    this.count += 1;
    this.setBadge();
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
