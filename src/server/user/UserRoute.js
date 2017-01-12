const {readUser, deleteUser, showUser, addFavorite, getFavorite, deleteFavorite,addReview} = require('./UserController');

module.exports = (app) => {
    app.get('/api/users', readUser);
    app.get('/api/users/:id', showUser);
    app.get('/api/users/:id/favorite', getFavorite);

    app.post('/api/users/:id/favorite', addFavorite);
    app.post('/api/users/:id/reviews', addReview);

    app.delete('/api/users/:id', deleteUser);
    app.delete('/api/users/:id/favorite', deleteFavorite);
};
