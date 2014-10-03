var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    PushView = require('../views/push'),
    $ = require('jquery');

module.exports = Backbone.View.extend({
  el : $('#body'),

  initialize : function(){
    this.listenTo(this.collection,'add',this.render,this);
  },

  addNew : function(push){
    var pushView = new PushView({model : push});
    this.$el.append(pushView.render().el);
  },

  render : function(){
    this.collection.setSorting('created');
    this.collection.fullCollection.sort();
    this.$el.html('');
    this.collection.forEach(this.addNew,this);
  }
});
