'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addReview = exports.deleteFavorite = exports.getFavorite = exports.addFavorite = exports.showUser = exports.deleteUser = exports.readUser = undefined;

var _UserModel = require('./UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readUser = function readUser(req, res) {
    _UserModel2.default.find({}).populate('foodTruck').exec(function (err, result) {
        res.json(result);
    });
};

var deleteUser = function deleteUser(req, res) {
    _UserModel2.default.remove({ _id: req.params.id }, function (err) {
        err ? res.status(500).send('failed to delete') : res.json('Successfully deleted record');
    });
};

var showUser = function showUser(req, res) {
    _UserModel2.default.find({ _id: req.params.id }, function (err, result) {
        err ? res.status(500).send('failed to find') : res.json(result);
    });
};

var addFavorite = function addFavorite(req, res) {
    _UserModel2.default.findByIdAndUpdate(req.params.id, { $push: { 'favorites': req.body } }).exec(function (err, result) {
        err ? res.status(500).send(err) : res.json(result);
    });
};

var getFavorite = function getFavorite(req, res) {
    _UserModel2.default.find({ _id: req.params.id }).exec(function (err, result) {
        err ? res.status(500).send(err) : res.json(result);
    });
};

var deleteFavorite = function deleteFavorite(req, res) {
    _UserModel2.default.remove({ _id: req.params.id }, function (err) {
        err ? res.status(500).send('failed to delete') : res.json('Successfully deleted record');
    });
};

var addReview = function addReview(req, res) {
    _UserModel2.default.findByIdAndUpdate(req.params.id, { $push: { 'reviews': req.body } }).exec(function (err, result) {
        err ? res.status(500).send(err) : res.json(result);
    });
};

exports.readUser = readUser;
exports.deleteUser = deleteUser;
exports.showUser = showUser;
exports.addFavorite = addFavorite;
exports.getFavorite = getFavorite;
exports.deleteFavorite = deleteFavorite;
exports.addReview = addReview;