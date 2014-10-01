var Backbone = require('backbone'),
    PageableCollection = ('backbone.paginator'),
    Router = require('./routers/router'),
    $ = require('jquery')
    Backbone.$ = $;

$(function(){
  Backbone.app = new Router();
})
