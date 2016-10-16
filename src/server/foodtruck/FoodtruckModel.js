import mongoose from 'mongoose';

const foodtruckSchema = mongoose.Schema({
    notification: {type: String},
    name: {type: String},
    cuisine: {type: String},
    photo: {type: String},
    phone: {type: String},
    website: {type: String},
    hours: {
        sunday: {type: String},
        monday: {type: String},
        tuesday: {type: String},
        wednesday: {type: String},
        thursday: {type: String},
        friday: {type: String},
        saturday: {type: String}
    },
    price: {
        min: {type: Number},
        max: {type: Number}
    },
    healthScore: {type: String},
    menu: [{
        name: {type: String},
        price: {type: Number}
    }],
    reviews: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        rating: {type: Number},
        description: {type: String},
        date: {type: Date}
    }]
});

module.exports = mongoose.model('Foodtruck', foodtruckSchema);