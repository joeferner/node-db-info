
var Driver = require('../driver');
var dbInfo = require('../db_info');
var mysql = require('mysql');
var async = require('async');

var MysqlDriver = Driver.extend({
	init: function() {
		this._super();
	},

	parseColumnType: function(columnType) {
		var results = {
			type: columnType
		};

		var match = columnType.match(/([a-zA-Z]+)\(([0-9]+)\)/);
		if(match) {
			results.type = match[1];
			results.length = match[2];
		}

		if(results.type == 'int') {
			results.type = dbInfo.INTEGER;
		}

		return results;
	},

	columnToDbInfo: function(column) {
		var info = {
			name: column['Field'],
			notNull: column['Null'] == 'NO' ? true : false,
		};

		if(column['Key']) {
			if(column['Key'] == 'PRI') {
				info.primaryKey = true;
			}
		}

		var columnTypeInfo = this.parseColumnType(column['Type']);
		for(var c in columnTypeInfo) {
			info[c] = columnTypeInfo[c];
		}

		return info;
	},

	tableToDbInfo: function(tableName, columns) {
		var info = {
			name: tableName,
			columns: {}
		};

		for(var i=0; i<columns.length; i++) {
			var column = columns[i];
			var col = this.columnToDbInfo(column);
			info.columns[col.name] = col;
		}

		return info;
	},

	getInfo: function(opts, callback) {
		var self = this;
		var db = opts.db;
		var createdDb = false;
	  	if(!db) {
	  		db = mysql.createClient(opts);
	  		createdDb = true;
	  	}

	  	db.query("show tables;", function(err, rows) {
			if(err) { callback(err); return; }

			async.mapSeries(rows, function(row, callback) {
				var tableName;
				for(var col in row) {
					tableName = row[col];
					break;
				}

				db.query("desc " + tableName + ";", function(err, rows) {
					if(err) { callback(err); return; }
					var tableInfo = self.tableToDbInfo(tableName, rows);
					callback(null, tableInfo);
				});
			}, function(err, results) {
				if(err) { callback(err); return; }
				if(createdDb) {
					db.end();
				}
				var info = {
					tables: {}
				};
				for(var i=0; i<results.length; i++) {
					info.tables[results[i].name] = results[i];
				}
				callback(null, info);
			});
	  	});
	}
});

module.exports = MysqlDriver;