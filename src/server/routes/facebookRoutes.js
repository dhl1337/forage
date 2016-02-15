/**
 * Created by danle on 1/29/16.
 */
var passport = require('passport');
var facebookController = '../controllers/facebookController.js';

module.exports = function (app) {
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook',
        {
            successRedirect: '/#/profile',
            failureRedirect: '/#/home'
        }));
    app.get('/auth/current', function (req, res){
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.sendStatus(401);
        }
    });
    app.get('/auth/logout', function (req, res) {
        req.logout();
        res.redirect('/#/home/index');
    });
};
