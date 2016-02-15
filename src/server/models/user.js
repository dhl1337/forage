/**
 * Created by danle on 1/29/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    foodtruckSchema = require('./foodtruck');

var userSchema = new Schema({
    facebook : {
        id: {type: String},
        token: {type: String},
        email: {type: String},
        name: {type: String},
        photo: {type: String},
        created: {type: String}
    },
    foodTruck: {
        type: mongoose.Schema.Types.ObjectId, ref: 'foodtruck',
        ft: foodtruckSchema
    },
    favorites: [{
        foodtruckId: {type: String},
        name: {type: String},
        photo: {type: String},
        cuisine: {type: String}
    }],
    reviews: [{
        foodtruckId: {type: String},
        name: {type: String},
        photo: {type: String},
        description: {type: String},
        rating: {type: Number}
    }]
});

module.exports = mongoose.model('User', userSchema);