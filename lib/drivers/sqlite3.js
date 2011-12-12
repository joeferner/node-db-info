
var sqliteParser = require('./sqlite3_parser');
var Driver = require('../driver');
var dbInfo = require('../db_info');
var sqlite3 = require("sqlite3");

var SqliteDriver = Driver.extend({
	init: function() {
		this._super();
	},

	toDbInfo: function(tree) {
		var results = {
			name: tree.tableName,
			columns: {}
		};

		for(var i=0; i<tree.columns.length; i++) {
			var col = this.columnToDbInfo(tree.columns[i]);
			results.columns[col.name] = col;
		}

		return results;
	},

	columnToDbInfo: function(columnDef) {
		var results = {
			name: columnDef.name
		};

		if(columnDef.type == 'INTEGER') {
			results.type = dbInfo.INTEGER;
		} else if(columnDef.type == 'TEXT') {
			results.type = dbInfo.TEXT;
		} else {
			results.type = dbInfo.UNKNOWN;
		}

		for(var i=0; i<columnDef.columnConstraints.length; i++) {
			var columnConstraint = columnDef.columnConstraints[i];
			if(columnConstraint == "PRIMARY KEY") {
				results.primaryKey = true;
				results.notNull = true;
			} else if(columnConstraint == "NOT NULL") {
				results.notNull = true;
			}
		}

		return results;
	},

	getInfo: function(opts, callback) {
		var self = this;
		var db = opts.db;
		var createdDb = false;
	  	if(!db) {
	  		db = new sqlite3.Database(opts.filename);
	  		createdDb = true;
	  	}

	  	db.all("SELECT sql FROM sqlite_master WHERE type='table'", function(err, rows) {
			if(err) { callback(err); return; }

			var results = {
				tables: {}
			};
			for(var i=0; i<rows.length; i++) {
				var sql = rows[i].sql;
				if(!sql.match(/;$/)) {
					sql += ';';
				}
				var tree = self.parseCreateTableSql(sql);
				results.tables[tree.tableName] = self.toDbInfo(tree);
			}

			if(createdDb) {
				db.close();
			}

			callback(null, results);
	  	});
	},

	parseCreateTableSql: function(sql) {
		var errorOffsets = new Array();
		var errorLookaheads = new Array();
		var errorCount = sqliteParser.parse(sql, errorOffsets, errorLookaheads);

		if(errorCount > 0)
		{
			var errstr = "";
			for(var i = 0; i < errorCount; i++) {
				errstr += 'Parse error near "' + sql.substr(errorOffsets[i]) + '", expecting "' + errorLookaheads[i].join() + '"\n' + sql;
			}
			throw new Error(errstr);
		} else {
			return parserResult;
		}
	}
});

module.exports = SqliteDriver;