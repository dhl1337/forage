import passport from 'passport';
import { logout, currentUser } from './FacebookController';

module.exports = (app) => {
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook',
        {
            successRedirect: '/#/home/user',
            failureRedirect: '/#/home/index'
        }));

    app.get('/auth/current', currentUser);
    app.get('/auth/logout', logout);
};