
var sqliteParser = require('./sqlite3_parser');
var Driver = require('../driver');
var dbInfo = require('../db_info');
var sqlite3 = require("sqlite3");

var SqliteDriver = Driver.extend({
	init: function() {
		this._super();
	},

	tableToDbInfo: function(tree) {
		var results = {
			name: tree.tableName,
			columns: {},
			indexes: {}
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
		} else if(columnDef.type == 'REAL') {
			results.type = dbInfo.REAL;
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
			} else if(columnConstraint == "AUTOINCREMENT") {
				results.autoIncrement = true;
			} else if(columnConstraint == "UNIQUE") {
				results.unique = true;
			} else if(columnConstraint.name && columnConstraint.name == "DEFAULT") {
				results.defaultValue = columnConstraint.value;
			} else if(columnConstraint.name && columnConstraint.name == "COLLATE") {
				results.collate = columnConstraint.value;
			}
		}

		return results;
	},

	indexToDbInfo: function(tree) {
		var result = {
			tableName: tree.tableName,
			name: tree.indexName,
			columns: tree.columns
		};
		return result;
	},

	getInfo: function(opts, callback) {
		var self = this;
		var db = opts.db;
		var createdDb = false;
	  	if(!db) {
	  		db = new sqlite3.Database(opts.filename);
	  		createdDb = true;
	  	}

	  	db.all("SELECT * FROM sqlite_master", function(err, rows) {
				if(err) { callback(err); return; }

				var results = {
					tables: {}
				};

				// clean up sql
				for(var i=0; i<rows.length; i++) {
					if(rows[i]['sql'] && !rows[i]['sql'].match(/;$/)) {
						rows[i]['sql'] += ';';
					}
				}

				// process tables
				for(var i=0; i<rows.length; i++) {
					if(rows[i]['type'] == 'table') {
						if(rows[i]['sql'].match(/sqlite_sequence/)) {
							continue;
						}

						var tree = self.parseSql(rows[i]['sql']);
						results.tables[tree.tableName] = self.tableToDbInfo(tree);
					}
				}

				// process indexes
				for(var i=0; i<rows.length; i++) {
					if(rows[i]['type'] == 'index' && rows[i]['sql']) {
						var tree = self.parseSql(rows[i]['sql']);
						var idx = self.indexToDbInfo(tree);
						results.tables[idx.tableName].indexes[idx.name] = idx;
					}
				}

				if(createdDb) {
					db.close();
				}

				callback(null, results);
	  	});
	},

	parseSql: function(sql) {
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