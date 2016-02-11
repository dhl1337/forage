/**
 * Created by danle on 2/4/16.
 */
module.exports = {
    logout: function (req, res) {
        req.logout();
        res.redirect('/#/home');
    },
    currentUser: function (req, res){
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.sendStatus(401);
        }
    }
};