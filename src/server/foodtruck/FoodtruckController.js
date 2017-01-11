const Foodtruck = require('./FoodtruckModel');
const User = require('../user/UserModel');

module.exports = {
    create(req, res){
        var foodtruck = {
            name: req.body.name,
            cuisine: req.body.cuisine,
            phone: req.body.phone,
            website: req.body.website,
            hours: req.body.hours,
            price: req.body.price,
            healthScore: req.body.healthScore,
            menu: req.body.menu
        };
        let newFoodtruck = new Foodtruck(foodtruck);
        newFoodtruck.save((err, result) => {
            err ? res.status(500).send(err)
                : User.findOneAndUpdate({'_id':req.body.userId}, {'$set': {'foodTruck': result._id}}, (err, updateResult) => {
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
            .exec((err, result) => err ? res.status(500).send('failed to find') : res.json(result))
    },

    updateFoodtruck(req, res){
        Foodtruck
            .findOneAndUpdate({'_id': req.params.id}, req.body)
            .exec((err, result) => err ? res.status(500).send(err) : res.json(result));
    }
};
