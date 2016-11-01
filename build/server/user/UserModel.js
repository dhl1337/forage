'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _FoodtruckModel = require('../foodtruck/FoodtruckModel');

var _FoodtruckModel2 = _interopRequireDefault(_FoodtruckModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = _mongoose2.default.Schema({
    facebook: {
        id: { type: String },
        token: { type: String },
        email: { type: String },
        name: { type: String },
        photo: { type: String },
        created: { type: String }
    },
    foodTruck: {
        type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Foodtruck',
        ft: _FoodtruckModel2.default
    },
    favorites: [{
        foodtruckId: { type: String },
        name: { type: String },
        photo: { type: String },
        cuisine: { type: String }
    }],
    reviews: [{
        foodtruckId: { type: String },
        name: { type: String },
        photo: { type: String },
        description: { type: String },
        rating: { type: Number }
    }]
});

module.exports = _mongoose2.default.model('User', userSchema);