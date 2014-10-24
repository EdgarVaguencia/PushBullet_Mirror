var Backbone = require('backbone'),
    // Handlebars = require('handlebars'),//Se requiere estructurar ya que en chrome-extension no permite la funcion eval() y Handlebars la requiere para compilar el template
    $ = require('jquery');

module.exports = Backbone.View.extend({

  tagname : 'article',

  classname : 'push',

  templateHtml : '<img src="{{#if push.icon}}data:image/png;base64,{{push.icon}}{{else}}https://blog.pushbullet.com/images/iphone_app_update_1/icon2.png{{/if}}" /><h1>{{push.title}}</h1><p class="pushBody">{{push.body}}</p><p class="details"><span class="application">{{push.application_name}}</span><span class="date">{{created}}</span></p>',

  initialize : function(){
    this.listenTo(this.model,'change',this.render,this);
  },

  render : function(){
    console.log(this.model.toJSON());
    var push = this.model.toJSON();
    var html = '<img src=';
    if( push.push.icon ){
      html += '"data:image/png;base64,'+push.push.icon+'"';
    }else{
      html += '"https://blog.pushbullet.com/images/iphone_app_update_1/icon2.png"';
    }
    html += ' /><h1>'+push.push.title+'</h1><p class="pushBody">'+push.push.body+'</p><p class="details"><span class="application">'+push.push.application_name+'</span><span class="date">'+push.created+'</span></p>';
    this.$el.html(html);
    return this;
  },

});
