/**
 * Created by danle on 1/30/16.
 */
var userController = require('../controllers/userController.js');

module.exports = function (app) {
    app.get('/api/users', userController.read);
    app.get('/api/users/:id', userController.show);
    app.delete('/api/users/:id', userController.delete);

    app.post('/api/users/favorite/:id', userController.addFavorite);
    app.get('/api/users/favorite/:id', userController.getFavorite);
    app.delete('/api/users/favorite/:id', userController.deleteFavorite);

    app.post('/api/users/reviews/:id', userController.addReview);
};