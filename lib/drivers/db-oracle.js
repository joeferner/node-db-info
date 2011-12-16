
var Driver = require('../driver');
var dbInfo = require('../db_info');
var oracle = require('db-oracle');
var async = require('async');
var util = require('util');

var OracleDriver = Driver.extend({
	init: function() {
		this._super();
	},

  typeToDbInfo: function(typeStr) {
    switch(typeStr.toLowerCase()) {
      case 'text': return dbInfo.TEXT;
      case 'integer': return dbInfo.INTEGER;
      case 'number': return dbInfo.INTEGER;
      default: return dbInfo.UNKNOWN;
    }
  },

  columnToDbInfo: function(db, columnRow, callback) {
    var columnInfo = {
      name: columnRow['COLUMN_NAME'],
      type: this.typeToDbInfo(columnRow['DATA_TYPE'])
    };

    if(columnRow['character_maximum_length']) {
      columnInfo.length = columnRow['character_maximum_length'];
    }

    callback(null, columnInfo);
  },

  tableToDbInfo: function(db, tableRow, callback) {
    var self = this;
    var tableInfo = {
      name: tableRow['TNAME'],
      columns: {},
			indexes: {}
    };
    var sql = util.format("SELECT column_name, data_type, data_length FROM all_tab_columns WHERE table_name = '%s'", tableInfo.name);
    db.query(sql).execute(function(err, results) {
      if(err) { callback(err); return; }
      async.mapSeries(results, self.columnToDbInfo.bind(self, db), function(err, columnResults) {
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
    var sql = "SELECT * FROM tab";
    db.query(sql).execute(function(err, results) {
      if(err) { callback(err); return; }
      async.mapSeries(results, self.tableToDbInfo.bind(self, db), function(err, results) {
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
      db = new oracle.Database(opts);
      db.connect(function(err) {
        if(err) { callback(err); return; }
        self.getInfoFromDb(db, function(err, dbInfo) {
          db.disconnect();
          callback(err, dbInfo);
        });
      });
		} else {
      self.getInfoFromDb(db, callback);
    }
	}
});

module.exports = OracleDriver;
