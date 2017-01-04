const {readUser, deleteUser, showUser, addFavorite, getFavorite, deleteFavorite,addReview} = require('./UserController');

module.exports = (app) => {
    app.get('/api/users', readUser);
    app.get('/api/users/:id', showUser);
    app.get('/api/users/favorite/:id', getFavorite);

    app.post('/api/users/favorite/:id', addFavorite);
    app.post('/api/users/reviews/:id', addReview);

    app.delete('/api/users/:id', deleteUser);
    app.delete('/api/users/favorite/:id', deleteFavorite);
};
