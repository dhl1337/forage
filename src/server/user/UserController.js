import User from './UserModel';

const readUser = (req, res) => {
    User.find({})
        .populate('foodTruck')
        .exec((err, result) => {
            res.json(result);
        })
};

const deleteUser = (req, res) => {
    User.remove({_id: req.params.id}, err => {
        err ? res.status(500).send('failed to delete') : res.json('Successfully deleted record');
    })
};

const showUser = (req, res) => {
    User.find({_id: req.params.id}, (err, result) => {
        err ? res.status(500).send('failed to find') : res.json(result);
    });
};

const addFavorite = (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$push: {'favorites': req.body}})
        .exec((err, result) => {
            err ? res.status(500).send(err) : res.json(result);
        })
};

const getFavorite = (req, res) => {
    User.find({_id: req.params.id})
        .exec((err, result) => {
            err ? res.status(500).send(err) : res.json(result);
        })
};

const deleteFavorite = (req, res) => {
    User.remove({_id: req.params.id}, err => {
        err ? res.status(500).send('failed to delete') : res.json('Successfully deleted record');
    })
};

const addReview = (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$push: {'reviews': req.body}})
        .exec((err, result) => {
            err ? res.status(500).send(err) : res.json(result);
        })
};

export {readUser, deleteUser, showUser, addFavorite, getFavorite, deleteFavorite, addReview}
