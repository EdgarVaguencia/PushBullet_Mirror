var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    PushView = require('../views/push'),
    $ = require('jquery');

module.exports = Backbone.View.extend({
  el : $('body'),

  initialize : function(){
    $('#options').hide();
    this.listenTo(this.collection,'add',this.render,this);
  },

  events : {
    'click #view_Timeline' : "viewTimeLine",
    'click #view_Options' : "viewOptions",
    'change #key_code' : ''
  },

  addNew : function(push){
    var pushView = new PushView({model : push});
    $('#body').append(pushView.render().el);
  },

  render : function(){
    this.collection.setSorting('created');
    this.collection.fullCollection.sort();
    $('#body').html('');
    this.collection.forEach(this.addNew,this);
  },

  viewTimeLine : function(){
    $('#options').hide();
    $('#body').show();
    Backbone.app.navigate('timeline',{ trigger : true });
  },

  viewOptions : function(){
    $('#body').hide();
    $('#options').show();
    Backbone.app.navigate('option',{ trigger : true });
  },

});
