import {Strategy} from 'passport-facebook';
import User from '../user/UserModel';
import {facebookAuth} from './auth';

module.exports = function (passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new Strategy({
        clientID: facebookAuth.clientID,
        clientSecret: facebookAuth.clientSecret,
        callbackURL: facebookAuth.callbackURL,
        profileFields: ['emails', 'photos', 'name', 'location']
    },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                User.findOne({'facebook.id' : profile.id}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser            = new User();

                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.facebook.photo = profile.photos[0].value;
                        newUser.facebook.created = new Date().getTime();
                        console.log(profile._json.location);


                        // save our user to the database
                        newUser.save(function(err) {
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
