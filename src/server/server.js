/**
 * Created by danle on 1/29/16.
 */
// Dependencies
var bodyParser = require('body-parser'),
    express = require('express'),
    expressSession = require('express-session'),
    db = require('./config/database.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    config = require('./config/config.js');

// Express
var app = express();


mongoose.connect(db.url);
mongoose.connection.once('open', function () {
    console.log("Successfully connected to mongodb")
});

require('./config/passport.js')(passport);

// Express Middleware
app.use(expressSession(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));


// Socket.io connection
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function (socket) {
    socket.on('location', function (data) {
        //console.log("location data",data);
        io.sockets.emit('location', data)
    })
});

// Facebook Authentication Endpoints
require('./routes/facebookRoutes.js')(app);

// User Endpoints
require('./routes/userRoutes.js')(app);

// Foodtruck Endpoints
require('./routes/foodtruckRoutes.js')(app);

// Reviews
require('./routes/reviewRoutes.js')(app);

// Connections
var port = config.port;
http.listen(port, function () {
    console.log('listening on port ' + port);
});

