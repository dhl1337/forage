/**
 * Created by danle on 2/3/16.
 */
var mongoose = require('mongoose');
var foodtruckSchema = mongoose.Schema({
    name: {type: String},
    cuisine: {type: String},
    description: {type: String},
    photo: {type: String},
    address: {type: String},
    city: {type: String},
    healthScore: {type: String},
    menu: [{
        name: {type: String},
        price: {type: Number}
    }],
    phone: {type: String},
    price: {
        min: {type: Number},
        max: {type: Number}
    },
    website: {type: String},
    zip: {type: Number},
    state: {type: String},
    hours: {
        sunday: {type: String},
        monday: {type: String},
        tuesday: {type: String},
        wednesday: {type: String},
        thursday: {type: String},
        friday: {type: String},
        saturday: {type: String}
    },
    reviews: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        title: {type: String},
        description: {type: String},
        date: {type: Date}
        //rating: {type: String}
    }]
});

module.exports = mongoose.model('foodtruck', foodtruckSchema);