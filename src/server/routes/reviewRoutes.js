/**
 * Created by danle on 2/13/16.
 */
var reviewController = require('../controllers/reviewController.js');

module.exports = function (app) {
    app.get('/api/reviews/:id', reviewController.read);
    app.post('/api/reviews/:id', reviewController.addReview);
};