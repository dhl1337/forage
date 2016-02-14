/**
 * Created by danle on 1/30/16.
 */
var User = require('./../models/user.js');
var ObjectId = require('mongoose').ObjectId;

module.exports = {
    read: function (req, res) {
        User
            .find({}).populate('foodTruck')
            .exec(function (err, result) {
            res.json(result);
        })
    },
    delete: function (req, res) {
        //var idToDelete = ObjectId(req.params.id);
        User
            .remove({_id: req.params.id}, function (err, result) {
            if (err) {
                res.status(500).send('failed to delete');
            }
            res.json('Successfully deleted record');
        })
    },
    show: function (req, res) {
        User.find({_id: req.params.id}, function (err, result) {
            if (err) {
                res.status(500).send('failed to find');
            } else {
                res.json(result);
            }
        });
    },
    addFavorite: function (req, res) {
        User
            .findByIdAndUpdate(req.params.id, {$push: {'favorites': req.body}})
            .exec(function (err, result) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    console.log(result);
                    res.json(result);
                }
            })
    },
    getFavorite: function (req, res) {
        User
            .find({_id: req.params.id})
            .exec(function (err, result) {
                if (err) return res.status(500).send(err);
                else res.json(result);
            })
    },
    deleteFavorite: function (req, res) {
        User
            .remove({_id: req.params.id}, function (err, result) {
            if (err) {
                res.status(500).send('failed to delete');
            }
            res.json('Successfully deleted record');
        })
    }
};