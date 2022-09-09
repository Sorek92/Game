/* Start server */

// Create server
var express = require('express');
var app = express();

var server = require('http').createServer(app);

var port = process.env.PORT || 3000;

// Read libraries
var mongoose = require('mongoose');
var passport = require('passport');

var morgan = require('morgan'); 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');


// Read configure of database
var configDB = require('./config/database.js');

// Connect to database
mongoose.connect(configDB.url, , {useNewUrlParser: true, useUnifiedTopology: true});

// Send to configure
require('./config/passport')(passport);

// Configure
app.use(express.static(__dirname + '/public')); //public folder as basic folder
app.use(morgan('dev')); // request logs on console
app.use(cookieParser()); // read cookies
app.use(bodyParser.json()); // request data from html form
app.use(bodyParser.urlencoded({extended: true})); // encoded data


// Authenticated
app.use(session({ secret: 'newgameplan' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // login session
app.use(flash());

// Routes
require('./app/routes.js')(app, passport);
require('./app/routesProfile.js')(app, server);

// Listening port
server.listen(port);
console.log("Listening on port : "+ port);

