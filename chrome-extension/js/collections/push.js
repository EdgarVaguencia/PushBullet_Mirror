var Backbone = require('backbone'),
    Push = require('../models/push');

module.exports = Backbone.PageableCollection.extend({
  model : Push,
  state : {
    pageSize : 10
  },
  mode : 'client'
});
