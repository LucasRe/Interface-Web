'use strict';

let r = require('rethinkdb');
let dbname = 'visiongl';

// Open a connection
let connection = null;
r.connect({
  host: 'localhost',
  port: 28015
}, function(err, conn) {
  if (err) throw err;
  connection = conn;
})

//
let dbc = r.dbList().contains(dbname).run(connection, function(err, result) {
  if (err) throw err;
  console.log(JSON.stringify(result, null, 2));
});
console.log(dbc);
if (dbc) {


} else {

}

setTimeout(function() {
  // Create a new DataBase
  r.dbCreate(dbname).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  })
}, 1000);


setTimeout(function() {
  // Create a new table
  r.db(dbname).tableCreate('users').run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  })
}, 1500);

setTimeout(function() {
  // Insert data
  r.db(dbname).table('users').insert([{
    userName: 'A',
    email: 'a@something.com',
    password: '******'
  }, {
    userName: 'B',
    email: 'b@something.com',
    password: '******'
  }, {
    userName: 'C',
    email: 'c@something.com',
    password: '******'
  }]).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  })
}, 10000);

setTimeout(function() {
  // All documents in a table
  r.db(dbname).table('users').run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
    });
  });


}, 12000);

setTimeout(function() {
  //  Filter documents based on a condition
  r.db(dbname).table('users').pluck('userName','email').filter(r.row('userName').eq('A')).
  run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
    });
  });


}, 12000);

setTimeout(function() {
  // Delete DB
  r.dbDrop(dbname).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  })
}, 50000);

setTimeout(function() {}, 2000);
