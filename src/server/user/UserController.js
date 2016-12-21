const User = require('./UserModel');

module.exports = {
    readUser(req, res) {
        User.find({})
            .populate('foodTruck')
            .exec((err, result) => {
                res.json(result);
            })
    },

    deleteUser(req, res) {
        User.remove({_id: req.params.id}, err => {
            err ? res.status(500).send('failed to delete') : res.json('Successfully deleted record');
        })
    },

    showUser(req, res) {
        User.find({_id: req.params.id}, (err, result) => {
            err ? res.status(500).send('failed to find') : res.json(result);
        });
    },
    addFavorite(req, res) {
        User.findByIdAndUpdate(req.params.id, {$push: {'favorites': req.body}})
            .exec((err, result) => {
                err ? res.status(500).send(err) : res.json(result);
            })
    },
    getFavorite(req, res) {
        User.find({_id: req.params.id})
            .exec((err, result) => {
                err ? res.status(500).send(err) : res.json(result);
            })
    },
    deleteFavorite(req, res) {
        User.remove({_id: req.params.id}, err => {
            err ? res.status(500).send('failed to delete') : res.json('Successfully deleted record');
        })
    },
    addReview(req, res) {
        User.findByIdAndUpdate(req.params.id, {$push: {'reviews': req.body}})
            .exec((err, result) => {
                err ? res.status(500).send(err) : res.json(result);
            })
    }
};
