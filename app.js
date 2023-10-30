
/*jshint esversion: 6 */

// Express app 
const express = require("express");

// MORGAN for inloggning
const morgan = require('morgan');

// Cross-Origin Resource Sharing (CORS)
// 3e parts modul för att andra domäner ska kunna hämta info ifrån våran app
const cors = require('cors');

// Parse the extra params with PUT/POST/DELETE
const bodyParser = require("body-parser");

// Express app
const app = express();
const port = 8334;
//console.log('Running on port' +port);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Use sqlite database & run it
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

// // Crypting passwords
// const bcrypt = require('bcryptjs');
// const saltRounds = 5; // The more rounds, the more difficult password
// const myPlainPassword = 'test1';
// var hashPsw = '';

// // Using password excryption
// bcrypt.hash(myPlainPassword, saltRounds, function(err, hash) {
//     // spara lösenord i databasen.
//     hashPsw = hash;
//     db.run("INSERT INTO users (email, password) VALUES (?, ?)",
//     "user@example.com",
//     myPlainPassword, (err) => {
//     if (err) {
//         // returnera error
//     }
//     // returnera korrekt svar
//     console.log('Password with hash saved');
// });
// });

// Use cors
app.use(cors());

// Enable to send req.body (request body) med POST
// till exempel via Postman
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

// Json webtokens 
// A secure way of using tokens for login etc. 
// https://2019.jsramverk.se/backend
// $npm install jsonwebtoken --save
// Save your webtoken locally & on the server 
// It is actually saved to a local process. 

// (Change longsecret to something of many characters & difficult)
// $export JWT_SECRET='longsecret' 
 const jwt = require('jsonwebtoken');
 const payload = { email: "user@example.com" };

 // What is in the process.env or other object?
 // Here is a way of finding out: 
 // https://stackoverflow.com/questions/10729276/how-can-i-get-the-full-object-in-node-jss-console-log-rather-than-object
 // onst showObj = require('util')
 // console.log(showObj.inspect(process.env, {showHidden: false, depth: null, colors: true}));

// JWT secret set in the script 
// process.env.JWT_SECRET = 'longSecretTest';
// console.log('JWT Jason Web Tokens:'+process.env.JWT_SECRET); // Collected from the environmental variables
const secret = process.env.JWT_SECRET; // using the secret token on your server & local environment

// Create the token sign 
const token = jwt.sign(payload, secret, { expiresIn: '1h'}); // here is your token
console.log('Token: '+token);

// Control that the token functions
jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
        // not a valid token
        console.log('Invalid token');
    }
    console.log('Valid token');
    // valid token
});

// ROUTES
// Add a route
// Require routes - routes that are stored in a catalog/directory
// Use the main name with a subcatalog
const index = require('./routes/index');
const hello = require('./routes/hello');
const reports= require('./routes/reportsReg');
const registry= require('./routes/registry');

app.use('/', index);
app.use('/hello', hello);
app.use('/reports', reports);
app.use('/users', registry);


// Get the token
app.get("/token", (req, res) => {
    res.json({
        data: {
            msg: "Token: "+token,
            token: token
        }
    });
});

// Test put & a status
app.put("/test", (req, res) => {
    res.status(204).send();
});

// Test a message
app.get("/hello/:msg", (req, res) => {
    const data = {
        data: {
            msg: req.params.msg
        }
    };
    res.json(data);
});

// app.get("/login/:psw", (req, res) => {
//     var userInput = req.params.psw;
//     var valid;
//     console.log("Password:"+userInput);
//     console.log("Hash:"+hashPsw); // Saved hash pasw

//     // ASYNC (useless demo)
//     bcrypt.compare(userInput, hashPsw, function(err, res) {
//         // res innehåller nu true eller false beroende på om det är rätt lösenord.
//         valid = 'incorrect password';
//         if (res) {
//             valid = 'correct password';
//         }
//         console.log("Valid:"+res);
//     });

//    // SYNC 
//    valid = bcrypt.compareSync(userInput, hashPsw); 
    
//     const data = {
//         data: {
//             msg: 'Result: '+valid
//         }
//     };

//     res.json(data);
// });


// app.post("/reports",
//     (req, res, next) => checkToken(req, res, next),
//     (req, res) => reports.addReport(res, req.body));

// function checkToken(req, res, next) {
//     const token = req.headers['x-access-token'];

//     jwt.verify(token, secret, function(err, decoded) {
//         if (err) {
//             // send error response
//             console.log('error token');
//         }

//         // Valid token send on the request
//             console.log('correct token');
//         next();
//     });
// }

// app.post("/reports", 
//     (req, res, next) => checkToken(req, res, next),
//     (req, res) => addReport(req.body, res));

//     function checkToken(req, res, next) {
//         const token2 = req.headers['x-access-token'];
//         console.log(token2);
//         console.log(req.body);

//         jwt.verify(token2, 'secret', function(err, decoded) {
//             if (err) {
//                 // send error response
//                 console.log('error token');
//                 res.status(201).json({
//                     data: {
//                         msg: "Error token"
//                     }
//                 });
//             }

//             if (decoded) {
//                 // Valid token send on the request
//                 console.log('correct token');
//                 next();
//                //console.log(addReport);
//             }
//     });
//     }

//     function addReport(req, res) {
//         console.log('Add report');
//         console.log(req); // Gets the req body

//         res.status(201).json({
//                     data: {
//                         msg: "Correct token"
//                     }
//                 });
//     }


// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));

