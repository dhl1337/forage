import mongoose from 'mongoose';
import foodtruckSchema from '../foodtruck/FoodtruckModel';

var userSchema = mongoose.Schema({
    facebook : {
        id: {type: String},
        token: {type: String},
        email: {type: String},
        name: {type: String},
        photo: {type: String},
        created: {type: String}
    },
    foodTruck: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Foodtruck',
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