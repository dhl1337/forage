/**
 * Created by danle on 2/15/16.
 */
var twilioController = require('../controllers/twilioController.js');
module.exports = function (app) {
    app.post('/api/twilio', twilioController.sendTextMessage);
    //app.put('/api/foodtrucks/message/:id', twilioController.sendTextMessage)
};