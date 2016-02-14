/**
 * Created by danle on 2/13/16.
 */
var Foodtruck = require('./../models/foodtruck.js');
var ObjectId = require('mongoose').ObjectId;

module.exports = {
    read: function (req, res) {
        //var userId = ObjectId(req.params.id);
        Foodtruck.find({'reviews.userId': req.params.id}, function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(result);
            }
        })
    },

    addReview: function (req, res) {
        //console.log(req.user);
        Foodtruck
            .findByIdAndUpdate(req.params.id, {$push: {'reviews': req.body}})
            .exec(function (err, result) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    console.log(result);
                    res.json(result);
                }
            })
    }
};