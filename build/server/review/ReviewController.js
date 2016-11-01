'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addReview = exports.getReview = undefined;

var _FoodtruckModel = require('../foodtruck/FoodtruckModel');

var _FoodtruckModel2 = _interopRequireDefault(_FoodtruckModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getReview = function getReview(req, res) {
    _FoodtruckModel2.default.find({ 'reviews.userId': req.params.id }, function (err, result) {
        err ? res.status(500).send(err) : res.json(result);
    });
};

var addReview = function addReview(req, res) {
    _FoodtruckModel2.default.findByIdAndUpdate(req.params.id, { $push: { 'reviews': req.body } }).exec(function (err, result) {
        err ? res.status(500).send(err) : res.json(result);
    });
};

exports.getReview = getReview;
exports.addReview = addReview;