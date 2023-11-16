
/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Hello",
            pres2: "I am Ylva Sjölin. \
            I enjoy creating with web programming teqniques like JavaScript & PHP.\
            And have previously completed 3.5 years in total of information system studies & web technology.\
            I also enjoy drawing among other things."
        }
    };

    res.json(data);
});

module.exports = router;