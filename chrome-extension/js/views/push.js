var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    $ = require('jquery');

module.exports = Backbone.View.extend({

  tagname : 'article',

  classname : 'push',

  templateHtml : '<img src="{{#if push.icon}}data:image/png;base64,{{push.icon}}{{else}}https://blog.pushbullet.com/images/iphone_app_update_1/icon2.png{{/if}}" /><h1>{{push.title}}</h1><p class="pushBody">{{push.body}}</p><p class="details"><span class="application">{{push.application_name}}</span><span class="date">{{created}}</span></p>',

  initialize : function(){
    this.listenTo(this.model,'change',this.render,this);
  },

  render : function(){
    var push = this.model.toJSON(),
        template = Handlebars.compile(this.templateHtml),
        html = template(push);
    this.$el.html(html);
    return this;
  }

});
