
var dbInfoUtils = require('./db_info_utils');

var Driver = dbInfoUtils.Class.extend({
  init: function() {
  },
  
  getInfo: function(opts, callback) {
  	throw new Error("Not Implemented");
  }
});

module.exports = Driver;
