const {create, read, deleteFoodtruck, current, updateFoodtruck} = require('./FoodtruckController');

module.exports = (app) => {
    app.get('/api/foodtrucks', read);
    app.get('/api/foodtrucks/:id', current);
    app.post('/api/foodtrucks', create);
    app.delete('/api/foodtrucks/:id', deleteFoodtruck);
    app.put('/api/foodtrucks/:id', updateFoodtruck);
};
