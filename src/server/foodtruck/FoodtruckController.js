const Foodtruck = require('./FoodtruckModel');
const User = require('../user/UserModel');

module.exports = {
    create(req, res){
        let newFoodtruck = new Foodtruck(req.body);
        console.log('req body', req.body);
        newFoodtruck.save((err, result) => {
            err ? res.status(500).send(err)
                : User.findByIdAndUpdate(req.user._id, {$set: {'foodTruck': result._id}}, (err, updateResult) => {
                err ? res.status(500).send(err) : res.json(result);
            });
        })
    },

    read (req, res) {
        Foodtruck
            .find(req.query)
            .exec((err, result) => {
                err ? res.status(500).send(err) : res.json(result);
            })
    },

    deleteFoodtruck(req, res) {
        let idToDelete = req.params.id;
        Foodtruck
            .remove({_id: idToDelete}, err => {
                err ? res.status(500).send('failed to delete') : res.json('Successfully deleted record');
            })
    },

    current(req, res){
        Foodtruck
            .find({_id: req.params.id})
            .populate('reviews.userId')
            .exec((err, result) => {
                err ? res.status(500).send('failed to find') : res.json(result);
            })
    },

    updateFoodtruck(req, res){
        Foodtruck
            .findByIdAndUpdate(req.user.foodTruck, {$set: req.body}, (err, result) => {
                err ? res.status(500).send() : res.json(result);
            })
    }
};
