
var dbinfo = require("../../lib/db_info");
var nodeunit = require("nodeunit");
var sqlite3 = require("mysql");

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
	  
	  console.log(require('util').inspect(result, false, 10));
	  
	  test.ok(result.tables['person']);
	  var personTable = result.tables['person'];
	  test.equal(personTable.columns.length, 4);
	  
	  test.equal(personTable.columns[0].name, 'id');
	  test.equal(personTable.columns[0].type, dbinfo.INTEGER);
	  test.ok(personTable.columns[0].primaryKey);
	  test.ok(personTable.columns[0].notNull);
	  
	  test.equal(personTable.columns[1].name, 'name');
	  test.equal(personTable.columns[1].type, dbinfo.VARCHAR);
	  test.equal(personTable.columns[1].length, 255);
	  test.ok(!personTable.columns[1].primaryKey);
	  test.ok(personTable.columns[1].notNull);

	  test.equal(personTable.columns[2].name, 'email');
	  test.equal(personTable.columns[2].type, dbinfo.VARCHAR);
	  test.equal(personTable.columns[2].length, 100);
	  test.ok(!personTable.columns[2].primaryKey);
	  test.ok(!personTable.columns[2].notNull);

	  test.equal(personTable.columns[3].name, 'age');
	  test.equal(personTable.columns[3].type, dbinfo.INTEGER);
	  test.ok(!personTable.columns[3].primaryKey);
	  test.ok(!personTable.columns[3].notNull);
	  
	  test.done();
	});
  }
});