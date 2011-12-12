
exports.INTEGER = "integer";
exports.TEXT = "text";
exports.VARCHAR = "varchar";
exports.REAL = "real";
exports.UNKNOWN = "unknown";

exports.getInfo = function(opts, callback) {
	if(!opts.driver) { throw new Error("'driver' is required."); }

	var Driver = require('./drivers/' + opts.driver);
	if(!Driver) { throw new Error("invalid driver '" + opts.driver + "'"); }

	var driver = new Driver();
	driver.getInfo(opts, callback);
}