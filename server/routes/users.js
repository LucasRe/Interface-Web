var express = require('express');
var router = express.Router();

/* GET ALL users listing. */
router.get('/', function(req, res, next) {
    res.json({get:'respond with a resource'});
});

// Insert new User
router.post('/new', function(req, res, next) {

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
        rDB.table('users').insert({
            email: req.query.email,
            password: req.query.password,
            firstName: req.query.firstName,
            lastName: req.query.lastName,
            nickname: req.query.nickname
        }).run(conn).then(function(err, result) {
            res.json({
                status: "SUCESSES"
            });
            console.log("#-> New user added");
            conn.close();
        }).error(function(err) {
            console.log("#-> FAIL on add new user");
            res.json({
                status: "FAIL"
            });
        });
    });


});

// Update User
router.put('/update', function(req, res, next) {

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
        rDB.table('users').getAll(req.query.email, {
            index: "email"
        }).update(req.query).run(conn).then(function(err, result) {
            res.json({
                status: "SUCESSES"
            });
            console.log("#-> User update");
            conn.close();
        }).error(function(err) {
            console.log("#-> FAIL on update user");
            res.json({
                status: "FAIL"
            });
        });
    });


});

// Delete User
router.delete('/delete', function(req, res, next) {

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
        rDB.table('users').getAll(req.query.email, {
            index: "email"
        }).delete().run(conn).then(function(err, result) {
            res.json({
                status: "SUCESSES"
            });
            console.log("#-> User deleted");
            conn.close();
        }).error(function(err) {
            console.log("#-> FAIL on delete user");
            res.json({
                status: "FAIL"
            });
        });
    });


});

module.exports = router;
