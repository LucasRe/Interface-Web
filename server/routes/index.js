var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.put('/', function(req, res, next) {

    // RethinkDB
    var rDB = require('rethinkdb');
    var rDBconfig = {
        host: "localhost",
        port: 28015,
        authKey: "",
        db: "VisionGL"
    };

    rDB.connect(rDBconfig, function(err, conn) {

        // Test Database connection
        if (err) {
            console.log("#-> Could not open a connection to initialize the database");
            console.log(err.message);
            process.exit(1);
        } else {
            console.log("#-> Database connected");
        }

        // Database is READY?
        rDB.table('users').indexWait('email').run(conn).then(function(err, result) {
            console.log("#-> Table and index are available");
        }).error(function(err) {
            // Create Database
            rDB.dbCreate(rDBconfig.db).run(conn).finally(function() {
                return rDB.tableCreate('users').run(conn);
            }).finally(function() {
                rDB.table('users').indexCreate('email').run(conn)
            }).finally(function(result) {
                rDB.table('users').indexWait('email').run(conn)
            }).then(function(result) {
                console.log("#-> Table and index are available");
                conn.close();
            }).error(function(err) {
                if (err) {
                    console.log("#-> Could not wait for the completion of the index `users`");
                    console.log(err);
                    process.exit(1);
                }
                console.log("#-> Table and index are available");
                conn.close();
            });
        });
    });

    res.json({
        status:"OK"
    });
});

module.exports = router;
