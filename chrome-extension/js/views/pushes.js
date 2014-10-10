var Backbone = require('backbone'),
    // Handlebars = require('handlebars'),
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
    this.collection.setSorting('created');
    this.collection.fullCollection.sort();
    localStorage['pushes'] = JSON.stringify(this.collection.toJSON());
  },

  viewTimeLine : function(){
    if( localStorage.pushes ){
      var pushes = JSON.parse(localStorage.getItem('pushes'));
      var self = this;
      $.each(pushes,function(k,i){
        self.addNew(i);
      });
    }
  },

});
