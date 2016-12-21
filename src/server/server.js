'use strict';

// Dependencies
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./configs/config');

// Express
const app = express();

mongoose.connect(process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || config.url);
mongoose.connection.once('open', () => console.log("Successfully connected to mongodb"));

require('./configs/passport.js')(passport);

// Express Middleware
app.use(expressSession(config.session));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.session());
app.use(express.static(__dirname + './../../build/public'));


// Socket.io connection
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
    socket.on('location', data => {
        io.sockets.emit('location', data)
    })
});

// Facebook Authentication Endpoints
require('./facebook/FacebookRoute')(app);

// User Endpoints
require('./user/UserRoute')(app);

// Foodtruck Endpoints
require('./foodtruck/FoodtruckRoute')(app);

// Reviews Endpoints
require('./review/ReviewRoute')(app);

// Connections
const port = process.env.PORT || config.port;
http.listen(port, () => console.log('listening on port ' + port));