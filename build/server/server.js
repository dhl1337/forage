'use strict';

// Dependencies

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('./configs/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Express
var app = (0, _express2.default)();

_mongoose2.default.connect(process.env.MONGOLAB_URI);
_mongoose2.default.connection.once('open', function () {
    return console.log("Successfully connected to mongodb");
});

require('./configs/passport.js')(_passport2.default);

// Express Middleware
app.use((0, _expressSession2.default)(process.env.SESSION_SECRET));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
app.use(_bodyParser2.default.json());
app.use(_express2.default.static(__dirname + '/../public'));

// Socket.io connection
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function (socket) {
    socket.on('location', function (data) {
        io.sockets.emit('location', data);
    });
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
var port = process.env.PORT;
console.log(port);
http.listen(port, function () {
    return console.log('listening on port ' + port);
});