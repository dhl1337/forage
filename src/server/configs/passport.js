const {Strategy} = require('passport-facebook');
const User = require('../user/UserModel');
const { facebookAuth } = require('./auth');

module.exports = function(passport) {
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });

    passport.use(new Strategy({
            clientID: process.env.FACEBOOK_CLIENT_ID || facebookAuth.clientID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || facebookAuth.clientSecret,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL || facebookAuth.callbackURL,
            profileFields: ['emails', 'photos', 'name', 'location']
        },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                User.findOne({'facebook.id': profile.id}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();

                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.facebook.photo = profile.photos[0].value;
                        newUser.facebook.created = new Date().getTime();

                        // save our user to the database
                        newUser.save(err => {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));
};
