/* Start server */

// Create server
var express = require('express');
var app = express();

var server = require('http').createServer(app);

var port = process.env.PORT || 3000;

// Read libraries
var morgan = require('morgan'); // 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// Configure
app.use(express.static(__dirname + '/public')); //public folder as basic folder
app.use(morgan('dev')); // request logs on console
app.use(cookieParser()); // read cookies
app.use(bodyParser.json()); // request data from html form
app.use(bodyParser.urlencoded({extended: true})); // encoded data


// Listening port
server.listen(port);
console.log("Listening on port : "+ port);

