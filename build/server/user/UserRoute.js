'use strict';

var _UserController = require('./UserController');

module.exports = function (app) {
    app.get('/api/users', _UserController.readUser);
    app.get('/api/users/:id', _UserController.showUser);
    app.delete('/api/users/:id', _UserController.deleteUser);

    app.post('/api/users/favorite/:id', _UserController.addFavorite);
    app.get('/api/users/favorite/:id', _UserController.getFavorite);
    app.delete('/api/users/favorite/:id', _UserController.deleteFavorite);

    app.post('/api/users/reviews/:id', _UserController.addReview);
};