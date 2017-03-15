'use strict';

const express = require("express");
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const argv = require('yargs').argv;
const shell = require("shelljs");

const app = express();

// Helmet Setting
app.use(helmet({
    noCache: true
}));

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static(__dirname + '/public'));

app.post('/exec', function(req, res, next) {
    var command = req.body.command;
    
    shell.exec(command, {silent: true}, function(code, stdout, stderr) {
        console.log(stdout);
        res.send(stdout);
    });
});

/* Application PORT Mapping */
if (argv.p === undefined || typeof(argv.p) != 'number') {
    console.log("Application PORT not defined properly");
    
    argv.p = 3003;
}
app.listen(argv.p, function() {
    console.log('Server started on port %d', argv.p);
});
