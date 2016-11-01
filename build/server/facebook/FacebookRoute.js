'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _FacebookController = require('./FacebookController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
    app.get('/auth/facebook', _passport2.default.authenticate('facebook', { scope: ['email', 'user_location'] }));

    app.get('/auth/facebook/callback', _passport2.default.authenticate('facebook', {
        successRedirect: '/#/home/user',
        failureRedirect: '/#/home/index'
    }));

    app.get('/auth/current', _FacebookController.currentUser);
    app.get('/auth/logout', _FacebookController.logout);
};