
var dbinfo = require("db-info");
var sqlite3 = require("sqlite3");

var db = new sqlite3.Database(':memory:');
db.run("CREATE TABLE person (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT, age INTEGER);", function() {
  dbinfo.getInfo({
    driver: 'sqlite3',
    db: db
  }, function(err, result) {
    if(err) { console.error(err); return; }
    
    console.log(require('util').inspect(result, false, 10));
  });
});