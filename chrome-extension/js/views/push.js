var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    $ = require('jquery');

module.exports = Backbone.View.extend({

  tagname : 'article',

  classname : 'push',

  templateHtml : '<h1>{{push.title}}</h1><p class="pushBody">{{push.body}}</p><p class="details"><span class="application">{{push.application_name}}</span><span class="date">{{date}}</span></p>',

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
