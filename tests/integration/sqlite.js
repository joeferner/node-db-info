
var dbinfo = require("../../lib/db_info");
var nodeunit = require("nodeunit");
var sqlite3 = require("sqlite3");

exports['Sqlite'] = nodeunit.testCase({
  setUp: function(callback) {
		callback();
  },

  tearDown: function(callback) {
		callback();
  },

  "single table": function(test) {
		var db = new sqlite3.Database(':memory:');
		db.run("CREATE TABLE person (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT, age INTEGER);", function() {
			dbinfo.getInfo({
			driver: 'sqlite3',
			db: db
			}, function(err, result) {
			if(err) { console.error(err); return; }

			//console.log(require('util').inspect(result, false, 10));

			test.ok(result.tables['person']);
			var personTable = result.tables['person'];

			test.ok(personTable.columns['id']);
			test.equal(personTable.columns['id'].name, 'id');
			test.equal(personTable.columns['id'].type, dbinfo.INTEGER);
			test.ok(personTable.columns['id'].primaryKey);
			test.ok(personTable.columns['id'].notNull);

			test.ok(personTable.columns['name']);
			test.equal(personTable.columns['name'].name, 'name');
			test.equal(personTable.columns['name'].type, dbinfo.TEXT);
			test.ok(!personTable.columns['name'].primaryKey);
			test.ok(personTable.columns['name'].notNull);

			test.ok(personTable.columns['email']);
			test.equal(personTable.columns['email'].name, 'email');
			test.equal(personTable.columns['email'].type, dbinfo.TEXT);
			test.ok(!personTable.columns['email'].primaryKey);
			test.ok(!personTable.columns['email'].notNull);

			test.ok(personTable.columns['age']);
			test.equal(personTable.columns['age'].name, 'age');
			test.equal(personTable.columns['age'].type, dbinfo.INTEGER);
			test.ok(!personTable.columns['age'].primaryKey);
			test.ok(!personTable.columns['age'].notNull);

			db.close();
			test.done();
			});
		});
  },

  "more complex table": function(test) {
    var db = new sqlite3.Database(':memory:');
    db.run("CREATE TABLE \"event\" (id INTEGER PRIMARY KEY AUTOINCREMENT, str TEXT UNIQUE, txt TEXT NOT NULL, intg INTEGER , rel REAL , dt INTEGER );", function() {
		db.run("CREATE INDEX strIndex on event (str);", function() {
		db.run("CREATE INDEX txtIndex on event (txt);", function() {
				dbinfo.getInfo({
					driver: 'sqlite3',
					db: db
				}, function(err, result) {
					if(err) { console.error(err); return; }

					//console.log(require('util').inspect(result, false, 10));

					test.ok(result.tables['event']);
					var eventTable = result.tables['event'];

					test.ok(eventTable.columns['id']);
					test.equal(eventTable.columns['id'].name, 'id');
					test.equal(eventTable.columns['id'].type, dbinfo.INTEGER);
					test.ok(eventTable.columns['id'].primaryKey);
					test.ok(eventTable.columns['id'].autoIncrement);

					test.ok(eventTable.columns['str']);
					test.equal(eventTable.columns['str'].name, 'str');
					test.equal(eventTable.columns['str'].type, dbinfo.TEXT);
					test.ok(eventTable.columns['str'].unique);

					test.ok(eventTable.columns['txt']);
					test.equal(eventTable.columns['txt'].name, 'txt');
					test.equal(eventTable.columns['txt'].type, dbinfo.TEXT);
					test.ok(eventTable.columns['txt'].notNull);

					test.ok(eventTable.columns['intg']);
					test.equal(eventTable.columns['intg'].name, 'intg');
					test.equal(eventTable.columns['intg'].type, dbinfo.INTEGER);

					test.ok(eventTable.columns['rel']);
					test.equal(eventTable.columns['rel'].name, 'rel');
					test.equal(eventTable.columns['rel'].type, dbinfo.REAL);

					test.ok(eventTable.columns['dt']);
					test.equal(eventTable.columns['dt'].name, 'dt');
					test.equal(eventTable.columns['dt'].type, dbinfo.INTEGER);

					test.ok(eventTable.indexes['strIndex']);
					test.ok(eventTable.indexes['strIndex'].name, 'strIndex');
					test.ok(eventTable.indexes['strIndex'].columns, ['str']);

					test.ok(eventTable.indexes['txtIndex']);
					test.ok(eventTable.indexes['txtIndex'].name, 'txtIndex');
					test.ok(eventTable.indexes['txtIndex'].columns, ['txt']);

					db.close();
					test.done();
				}) }) });
			}
    );
  }

});
