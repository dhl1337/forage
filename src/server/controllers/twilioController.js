/**
 * Created by danle on 2/15/16.
 */
var Foodtruck = require('./../models/foodtruck.js'),
    config = require('../config/config.js'),
    client = require('twilio')(config.twilio.ACCOUNT_SID, config.twilio.AUTH_TOKEN);


module.exports = {
    sendTextMessage: function (req, res) {
        //console.log('body?', req.body.message);
        //console.log('this is req body', req.body);
        client.sendMessage({
            to: '+12282298475',
            from: '+12282224994',
            body: req.body.message
        }, function (err, data) {
            if (err) {
                res.status(500).send('failed to send');
            } else {
                res.json(data);
            }
        })
    }
    //sendTextMessage: function (req, res) {
    //    //console.log('hi', req.body);
    //    //console.log(Foodtruck);
    //    Foodtruck
    //        .findByIdAndUpdate(req.user.foodTruck, {$set: {'notification': req.body}},
    //            function (err, result){
    //                if (err) {
    //                    res.status(500).send();
    //                } else {
    //                    res.json(result);
    //                }
    //            })
    //}
};