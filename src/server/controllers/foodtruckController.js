/**
 * Created by danle on 2/3/16.
 */
var Foodtruck = require('./../models/foodtruck.js');
var User = require('./../models/user.js');
//var ObjectId = require('mongoose').ObjectId;

module.exports = {
    create: function (req, res) {
        var newFoodtruck = new Foodtruck(req.body);
        newFoodtruck.save(function(err, result) {
            if (err) return res.status(500).send(err);
            else {
                User
                    .findByIdAndUpdate(req.user._id, {$set: {'foodTruck': result._id}},
                    function (err, updateResult) {
                        if (err) {
                            return res.status(500).send(err);
                        } else {
                            //console.log(updateResult);
                            res.json(result);
                        }
                    });
            }
        })
    },
    read: function (req, res) {
        Foodtruck
            .find(req.query)
            .exec(function (err, result) {
                if (err) return res.status(500).send(err);
                else res.json(result);
            })
    },
    delete: function (req, res) {
        var idToDelete = req.params.id;
        Foodtruck
            .remove({_id: idToDelete}, function (err, result) {
            if (err) {
                res.status(500).send('failed to delete');
            }
            res.json('Successfully deleted record');
        })
    },
    current: function (req, res) {
        Foodtruck
            .find({_id: req.params.id})
            .populate('reviews.userId')
            .exec(function(err, result){
            if(err) {
                res.status(500).send('failed to find');
            } else {
                res.json(result);
            }
        })
    },
    updateFoodtruck: function (req, res) {
        //console.log(req.body);
        Foodtruck
            .findByIdAndUpdate(req.user.foodTruck, {$set: req.body}, function (err, result) {
            if (err) {
                res.status(500).send();
            } else {
                res.json(result);
            }
        })
    }
};