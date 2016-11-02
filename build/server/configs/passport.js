'use strict';

var _passportFacebook = require('passport-facebook');

var _UserModel = require('../user/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _auth = require('./auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        return done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        _UserModel2.default.findById(id, function (err, user) {
            return done(err, user);
        });
    });

    passport.use(new _passportFacebook.Strategy({
        clientID: process.env.FACEBOOK_CLIENT_ID || _auth.facebookAuth.clientID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || _auth.facebookAuth.clientSecret,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL || _auth.facebookAuth.callbackURL,
        profileFields: ['emails', 'photos', 'name', 'location']
    }, function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            _UserModel2.default.findOne({ 'facebook.id': profile.id }, function (err, user) {
                if (err) return done(err);
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new _UserModel2.default();

                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;
                    newUser.facebook.photo = profile.photos[0].value;
                    newUser.facebook.created = new Date().getTime();

                    // save our user to the database
                    newUser.save(function (err) {
                        if (err) throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};