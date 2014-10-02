var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    PushView = require('../views/push'),
    $ = require('jquery');

module.exports = Backbone.View.extend({
  el : $('#body'),

  initialize : function(){
    this.listenTo(this.collection,'add',this.addNew,this);
  },

  addNew : function(push){
    var pushView = new PushView({model : push});
    this.$el.append(pushView.render().el);
  }
});
