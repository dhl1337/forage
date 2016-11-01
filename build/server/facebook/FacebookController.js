'use strict';

module.exports = {
    logout: function logout(req, res) {
        req.logout();
        res.redirect('/#/home/index');
    },
    currentUser: function currentUser(req, res) {
        req.isAuthenticated() ? res.json(req.user) : res.sendStatus(401);
    }
};