'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateFoodtruck = exports.current = exports.deleteFoodtruck = exports.read = exports.create = undefined;

var _FoodtruckModel = require('./FoodtruckModel');

var _FoodtruckModel2 = _interopRequireDefault(_FoodtruckModel);

var _UserModel = require('../user/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(req, res) {
    var newFoodtruck = new _FoodtruckModel2.default(req.body);
    newFoodtruck.save(function (err, result) {
        err ? res.status(500).send(err) : _UserModel2.default.findByIdAndUpdate(req.user._id, { $set: { 'foodTruck': result._id } }, function (err, updateResult) {
            err ? res.status(500).send(err) : res.json(result);
        });
    });
};

var read = function read(req, res) {
    _FoodtruckModel2.default.find(req.query).exec(function (err, result) {
        err ? res.status(500).send(err) : res.json(result);
    });
};

var deleteFoodtruck = function deleteFoodtruck(req, res) {
    var idToDelete = req.params.id;
    _FoodtruckModel2.default.remove({ _id: idToDelete }, function (err) {
        err ? res.status(500).send('failed to delete') : res.json('Successfully deleted record');
    });
};

var current = function current(req, res) {
    _FoodtruckModel2.default.find({ _id: req.params.id }).populate('reviews.userId').exec(function (err, result) {
        err ? res.status(500).send('failed to find') : res.json(result);
    });
};

var updateFoodtruck = function updateFoodtruck(req, res) {
    _FoodtruckModel2.default.findByIdAndUpdate(req.user.foodTruck, { $set: req.body }, function (err, result) {
        err ? res.status(500).send() : res.json(result);
    });
};

exports.create = create;
exports.read = read;
exports.deleteFoodtruck = deleteFoodtruck;
exports.current = current;
exports.updateFoodtruck = updateFoodtruck;