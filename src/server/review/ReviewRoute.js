const {getReview, addReview} = require('./ReviewController');

module.exports = (app) => {
    app.get('/api/reviews/:id', getReview);
    app.post('/api/reviews/:id', addReview);
};