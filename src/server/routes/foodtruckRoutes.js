/**
 * Created by danle on 2/3/16.
 */
var foodtruckController = require('../controllers/foodtruckController.js');

module.exports = function (app) {
    app.get('/api/foodtrucks', foodtruckController.read);
    app.get('/api/foodtrucks/:id', foodtruckController.current);
    app.post('/api/foodtrucks', foodtruckController.create);
    app.delete('/api/foodtrucks/:id', foodtruckController.delete);
    app.put('/api/foodtrucks/:id', foodtruckController.updateFoodtruck);

};