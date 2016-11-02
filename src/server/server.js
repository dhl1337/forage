'use strict';

// Dependencies
import bodyParser from 'body-parser';
import express from 'express';

import expressSession from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
//import config from './configs/config'

// Express
const app = express();

mongoose.connect(process.env.MONGOLAB_URI || config.url);
mongoose.connection.once('open', () => console.log("Successfully connected to mongodb"));

require('./configs/passport.js')(passport);

// Express Middleware
app.use(expressSession(process.env.SESSION_SECRET || config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

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
console.log(port);
http.listen(port, () => console.log('listening on port ' + port));