var Backbone = require('backbone'),
    $ = require('jquery');

module.exports = Backbone.View.extend({

  el : $('#body'),

  events : {
    'click #signin>span' : 'openWeb'
  },

  templateHandlebars : '<div id="signin" ><span>Sign In PushBullet</span></div>',

  render : function(){
    console.log("Entra render sign");
    this.$el.html(this.templateHandlebars);
  },

  openWeb : function(){
    chrome.tabs.create({ 'url': 'https://www.pushbullet.com/' });
  },

});
