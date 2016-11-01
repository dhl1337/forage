'use strict';

var _FoodtruckController = require('./FoodtruckController');

module.exports = function (app) {
    app.get('/api/foodtrucks', _FoodtruckController.read);
    app.get('/api/foodtrucks/:id', _FoodtruckController.current);
    app.post('/api/foodtrucks', _FoodtruckController.create);
    app.delete('/api/foodtrucks/:id', _FoodtruckController.deleteFoodtruck);
    app.put('/api/foodtrucks/:id', _FoodtruckController.updateFoodtruck);
};