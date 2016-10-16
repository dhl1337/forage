import {readUser, deleteUser, showUser, addFavorite, getFavorite, deleteFavorite,addReview} from './UserController'

module.exports = (app) => {
    app.get('/api/users', readUser);
    app.get('/api/users/:id', showUser);
    app.delete('/api/users/:id', deleteUser);

    app.post('/api/users/favorite/:id', addFavorite);
    app.get('/api/users/favorite/:id', getFavorite);
    app.delete('/api/users/favorite/:id', deleteFavorite);

    app.post('/api/users/reviews/:id', addReview);
};
