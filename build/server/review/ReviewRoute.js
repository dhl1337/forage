'use strict';

var _ReviewController = require('./ReviewController');

module.exports = function (app) {
    app.get('/api/reviews/:id', _ReviewController.getReview);
    app.post('/api/reviews/:id', _ReviewController.addReview);
};