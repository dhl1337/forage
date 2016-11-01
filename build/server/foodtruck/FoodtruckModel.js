'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var foodtruckSchema = _mongoose2.default.Schema({
    notification: { type: String },
    name: { type: String },
    cuisine: { type: String },
    photo: { type: String },
    phone: { type: String },
    website: { type: String },
    hours: {
        sunday: { type: String },
        monday: { type: String },
        tuesday: { type: String },
        wednesday: { type: String },
        thursday: { type: String },
        friday: { type: String },
        saturday: { type: String }
    },
    price: {
        min: { type: Number },
        max: { type: Number }
    },
    healthScore: { type: String },
    menu: [{
        name: { type: String },
        price: { type: Number }
    }],
    reviews: [{
        userId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number },
        description: { type: String },
        date: { type: Date }
    }]
});

module.exports = _mongoose2.default.model('Foodtruck', foodtruckSchema);