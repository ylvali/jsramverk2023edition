/*jshint esversion: 6 */

// Express & the router
var express = require('express');
var router = express.Router();

// Enable to send req.body (request body) med POST
// till exempel via Postman
// Parse the extra params with PUT/POST/DELETE
const bodyParser = require("body-parser");
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Use database & run it
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

// Route : get report per week
router.get('/week/:nr', function(req, res, next) {
    var week;
    var params;
    var theSql;
    
    // Get the week nr from the URL
    week = 'week'+req.params.nr;

    // Call the database with the week nr
    theSql = "SELECT * FROM reports WHERE title = ?;";
    params = [week];

    db.all(theSql, params, (err, rows)=> {
            if (err) {
            console.log('Error: '+err.message);
            res.status(400).json({"error":err.message});
            return;
            }

            if (rows) {
            console.log (rows);
            console.log('Success: '+rows);
            
            const data = {
                data: {
                    msg: 'Success: correct command',
                    data: rows
                }
                };
                res.json(data);
            }
    });
});

// Json webtokens 
// Save your webtoken locally & on the server 
// It is actually saved to a local process: process.env
// (Change longsecret to something of many characters & difficult)
// $export JWT_SECRET='longsecret' // in CLI
const jwt = require('jsonwebtoken');
const payload = { email: "user@example.com" };
//console.log(process.env.JWT_SECRET);
const secret = process.env.JWT_SECRET; // using the secret token on your server & local environment
const token = jwt.sign(payload, secret, { expiresIn: '1h'}); // here is your token
//console.log('Token2: '+token);

router.post("/add", 
    (req, res, next) => checkToken(req, res, next),
    (req, res) => addReport(req, res));


    function checkToken(req, res, next) {
        const token2 = req.headers['x-access-token'];
        console.log('Check token');
        //console.log(req.body);
        //console.log('TOKEN:'+token2);

        jwt.verify(token2, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                // send error response
                console.log('error token');
                res.status(201).json({
                    data: {
                        msg: "Error token"
                    }
                });
            }

            if (decoded) {
                // Valid token send on the request
                console.log('correct token');
                next();
               //console.log(addReport);
            }
    });
    }

    function addReport(req, res, next) {
        console.log('Add report');
        console.log(req.body); // Gets the req body

        if (!req.body.data1 || !req.body.title) {
            res.status(400).json({"error":'no title / data'});
            return;
        }

        var params;
        var theSql = "INSERT INTO reports (data, title) VALUES (?, ?);";
        var data = req.body.data1;
        var title = req.body.title;

        console.log( 'Data: '+data);
        console.log( 'Title: '+title);

        params = [data, title];

        db.all(theSql, params, (err, rows)=> {
             if (err) {
                console.log('Error: '+err.message);
                res.status(400).json({"error":err.message});
                return;
              }

              if (rows) {
                console.log (rows);
                console.log('Success: '+rows);
                
                const data = {
                  data: {
                      msg: 'Success: data registered',
                      data: rows
                  }
                 };
                 res.json(data);
              }
        });

    }
module.exports = router;