/**
 * Created by danle on 1/30/16.
 */
var userController = require('../controllers/userController.js');

module.exports = function (app) {
    app.get('/api/users', userController.read);
    app.get('/api/users/:id', userController.show);
    app.delete('/api/users/:id', userController.delete);
};