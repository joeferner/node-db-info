
var dbinfo = require("../../lib/db_info");
var nodeunit = require("nodeunit");
var sqlite3 = require("mysql");

/*
 CREATE TABLE person (id INTEGER PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(100), age INTEGER);
 CREATE INDEX nameIndex ON person (name);
 CREATE INDEX otherIndex ON person (name,email);
*/
exports['Mysql'] = nodeunit.testCase({
  setUp: function(callback) {
	callback();
  },

  tearDown: function(callback) {
	callback();
  },

  "single table": function(test) {
	dbinfo.getInfo({
	  driver: 'mysql',
	  user: 'root',
	  password: 'root',
	  database: 'dbinfotest'
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
	  test.equal(personTable.columns['name'].type, dbinfo.VARCHAR);
	  test.equal(personTable.columns['name'].length, 255);
	  test.ok(!personTable.columns['name'].primaryKey);
	  test.ok(personTable.columns['name'].notNull);

		test.ok(personTable.columns['email']);
	  test.equal(personTable.columns['email'].name, 'email');
	  test.equal(personTable.columns['email'].type, dbinfo.VARCHAR);
	  test.equal(personTable.columns['email'].length, 100);
	  test.ok(!personTable.columns['email'].primaryKey);
	  test.ok(!personTable.columns['email'].notNull);

		test.ok(personTable.columns['age']);
	  test.equal(personTable.columns['age'].name, 'age');
	  test.equal(personTable.columns['age'].type, dbinfo.INTEGER);
	  test.ok(!personTable.columns['age'].primaryKey);
	  test.ok(!personTable.columns['age'].notNull);

		test.ok(personTable.indexes['nameIndex']);
		test.ok(personTable.indexes['nameIndex'].name, 'nameIndex');
		test.ok(personTable.indexes['nameIndex'].columns, ['name']);

		test.ok(personTable.indexes['otherIndex']);
		test.ok(personTable.indexes['otherIndex'].name, 'otherIndex');
		test.ok(personTable.indexes['otherIndex'].columns, ['name', 'email']);

	  test.done();
	});
  }
});