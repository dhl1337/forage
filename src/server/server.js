'use strict';
// Dependencies
import bodyParser from 'body-parser';
import express from 'express';
import expressSession from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import config from './configs/config'

// Express
let app = express();

mongoose.connect(config.url);
mongoose.connection.once('open', () => console.log("Successfully connected to mongodb"));

require('./configs/passport.js')(passport);

// Express Middleware
app.use(expressSession(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));


// Socket.io connection
let http = require('http').Server(app);
let io = require('socket.io')(http);


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

// Reviews
require('./review/ReviewRoute')(app);

// Twilio
require('./twilio/TwilioRoute')(app);

// Connections
let port = config.port;
http.listen(port, () => console.log('listening on port ' + port));