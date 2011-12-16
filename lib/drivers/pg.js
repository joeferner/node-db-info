
var Driver = require('../driver');
var dbInfo = require('../db_info');
var pg = require('pg');
var async = require('async');
var util = require('util');

var PostgreSqlDriver = Driver.extend({
	init: function() {
		this._super();
	},

  typeToDbInfo: function(typeStr) {
    switch(typeStr.toLowerCase()) {
      case 'text': return dbInfo.TEXT;
      case 'integer': return dbInfo.INTEGER;
      default: return dbInfo.UNKNOWN;
    }
  },

  columnToDbInfo: function(db, columnRow, callback) {
    var columnInfo = {
      name: columnRow['column_name'],
      type: this.typeToDbInfo(columnRow.data_type)
    };

    if(columnRow['character_maximum_length']) {
      columnInfo.length = columnRow['character_maximum_length'];
    }

    callback(null, columnInfo);
  },

  tableToDbInfo: function(db, tableRow, callback) {
    var self = this;
    var tableInfo = {
      name: tableRow['table_name'],
      columns: {},
			indexes: {}
    };
    var sql = util.format("SELECT * FROM information_schema.columns WHERE table_name = '%s'", tableRow['table_name']);
    db.query(sql, function(err, results) {
      if(err) { callback(err); return; }
      async.mapSeries(results.rows, self.columnToDbInfo.bind(self, db), function(err, columnResults) {
        if(err) { callback(err); return; }
        for(var i=0; i<columnResults.length; i++) {
					tableInfo.columns[columnResults[i].name] = columnResults[i];
				}
        callback(null, tableInfo);
      });
    });
  },

  getInfoFromDb: function(db, callback) {
    var self = this;
    var sql = "SELECT * FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema');";
    db.query(sql, function(err, results) {
      if(err) { callback(err); return; }
      async.mapSeries(results.rows, self.tableToDbInfo.bind(self, db), function(err, results) {
        if(err) { callback(err); return; }
        var info = {
					tables: {}
				};
				for(var i=0; i<results.length; i++) {
					info.tables[results[i].name] = results[i];
				}
				callback(null, info);
      });
    });
  },

	getInfo: function(opts, callback) {
		var self = this;
		var db = opts.db;
		if(!db) {
      db = new pg.Client(opts.connectionString || opts);
      db.connect(function(err) {
        if(err) { callback(err); return; }
        self.getInfoFromDb(db, function(err, dbInfo) {
          db.end();
          callback(err, dbInfo);
        });
      });
		} else {
      self.getInfoFromDb(db, callback);
    }
	}
});

module.exports = PostgreSqlDriver;
