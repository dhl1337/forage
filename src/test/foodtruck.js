const mongoose = require('mongoose');
const FoodTruck = require('../server/foodtruck/FoodtruckModel');
const chai = require('chai');
const {expect, assert} = require('chai');
const chaiHttp = require('chai-http');
const Browser = require('zombie');

let passport = require('passport');
const {Strategy} = require('passport-facebook');

chai.use(chaiHttp);
chai.use(require('chai-passport-strategy'));
var fb = require('../server/configs/auth.js');

var request = require('supertest');
let app = require('../server/server');
let fbAuth = require('../server/facebook/FacebookRoute')(app);

const User = require('../server/user/UserModel');

describe('food truck', function () {

    describe('fetched from default endpoint', function () {
        var strategy = new Strategy({
            clientID: fb.FacebookAuth.clientID,
            clientSecret: fb.FacebookAuth.clientSecret
        }, function () {

        });

        strategy._oauth2.get = function (url, accessToken, callback) {
            if (url != 'https://graph.facebook.com/v2.5/me') {
                return callback(new Error('incorrect url argument'));
            }
            if (accessToken != 'token') {
                return callback(new Error('incorrect token argument'));
            }

            var body = '{"id":"500308595","name":"Jared Hanson","first_name":"Jared","last_name":"Hanson","link":"http:\\/\\/www.facebook.com\\/jaredhanson","username":"jaredhanson","gender":"male","email":"jaredhanson\\u0040example.com"}';
            callback(null, body, undefined);
        };

        var profile,
            newUserProfile;


        before(function (done) {
            strategy.userProfile('token', function (err, p) {
                if (err) {
                    return done(err);
                }

                profile = p;

                User.findOne({'facebook.id': profile.id}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        newUserProfile = user;
                        done();
                    } else {
                        var newUser = new User();

                        newUser.facebook.id = profile.id;
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.facebook.created = new Date().getTime();

                        // save our user to the database
                        newUser.save(err => {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            newUserProfile = newUser;
                            done();
                        });
                    }
                });


            });
        });

        it('should parse profile', () => {
            expect(profile.provider).to.equal('facebook');

            expect(profile.id).to.equal('500308595');
            expect(profile.username).to.equal('jaredhanson');
            expect(profile.displayName).to.equal('Jared Hanson');
            expect(profile.name.familyName).to.equal('Hanson');
            expect(profile.name.givenName).to.equal('Jared');
            expect(profile.gender).to.equal('male');
            expect(profile.profileUrl).to.equal('http://www.facebook.com/jaredhanson');
            expect(profile.emails).to.have.length(1);
            expect(profile.emails[0].value).to.equal('jaredhanson@example.com');
            expect(profile.photos).to.be.undefined;
        });

        it('should set raw property', () => {
            expect(profile._raw).to.be.a('string');
        });

        it('should set json property', () => {
            expect(profile._json).to.be.an('object');
        });

        describe('Food truck user', function () {
            it('should register a user to a food trucker', (done) => {

                const foodTruck = {
                    id: newUserProfile._id,
                    name: 'food truck name',
                    cuisine: 'chinese',
                    phone: '1231231234',
                    website: 'www.google.com',
                    hours: {
                        sunday: 'CLOSED',
                        monday: 'CLOSED',
                        tuesday: '12:00 PM - 1:00 PM',
                        wednesday: '12:00 PM - 1:00 PM',
                        thursday: '12:00 PM - 1:00 PM',
                        friday: '12:00 PM - 1:00 PM',
                        saturday: '12:00 PM - 1:00 PM'
                    },
                    price: {min: '1', max: '2'},
                    healthScore: '12',
                    menu: [{name: 'RICE', price: '2'}]
                };

                chai.request(app)
                    .post('/api/foodtrucks')
                    .send(foodTruck)
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body.name).to.equal('food truck name');
                        expect(res.body.cuisine).to.equal('chinese');
                        expect(res.body.phone).to.equal('1231231234');
                        expect(res.body.website).to.equal('www.google.com');
                        expect(res.body.hours.sunday).to.equal('CLOSED');
                        expect(res.body.hours.monday).to.equal('CLOSED');
                        expect(res.body.hours.tuesday).to.equal('12:00 PM - 1:00 PM');
                        expect(res.body.hours.wednesday).to.equal('12:00 PM - 1:00 PM');
                        expect(res.body.hours.thursday).to.equal('12:00 PM - 1:00 PM');
                        expect(res.body.hours.friday).to.equal('12:00 PM - 1:00 PM');
                        expect(res.body.hours.saturday).to.equal('12:00 PM - 1:00 PM');
                        expect(res.body.price.min).to.equal(1);
                        expect(res.body.price.max).to.equal(2);
                        expect(res.body.healthScore).to.equal('12');
                        expect(res.body.menu[0].name).to.equal('RICE');
                        expect(res.body.menu[0].price).to.equal(2);
                        done();
                    })
            });

            it('should update food truck', () => {

                const foodTruck = {
                    name: 'Update food truck name',
                    cuisine: 'chinese',
                    phone: '1231231234',
                    website: 'www.google.com',
                    hours: {
                        sunday: 'CLOSED',
                        monday: 'CLOSED',
                        tuesday: '12:00 PM - 1:00 PM',
                        wednesday: '12:00 PM - 1:00 PM',
                        thursday: '12:00 PM - 1:00 PM',
                        friday: '12:00 PM - 1:00 PM',
                        saturday: '12:00 PM - 1:00 PM'
                    },
                    price: {min: '1', max: '2'},
                    healthScore: '12',
                    menu: [{name: 'RICE', price: '2'}]
                };

                chai.request(app)
                    .put(`/api/foodtrucks/${newUserProfile.foodTruck}`)
                    .send(foodTruck)
                    .end((err, res) => {
                        //console.log('put', res.body);
                        //expect(res.body).to.equal('Successfully deleted record');
                        done();
                    })
            });

            it('should delete select food truck', () => {
                chai.request(app)
                    .del(`/api/foodtrucks/${newUserProfile.foodTruck}`)
                    .end((err, res) => {
                        expect(res.body).to.equal('Successfully deleted record');
                        done();
                    })
            });



        });


    });

});



