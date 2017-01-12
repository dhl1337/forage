const mongoose = require('mongoose');
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
const FoodTruck = require('../server/foodtruck/FoodtruckModel');


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
            newUserProfile,
            newFoodTruck;


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
                            if (err) {
                                throw err;
                            }

                            // if successful, return the new user
                            newUserProfile = newUser;

                            var foodtruck = {
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

                            let newFoodtruck = new FoodTruck(foodtruck);

                            newFoodtruck.save((err, truckResult) => {
                                if (err) {
                                    throw err;
                                }

                                newFoodTruck = truckResult;
                                done();

                            });
                        });
                    }
                });


            });
        });

        it('should parse profile', function () {
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

        it('should set raw property', function () {
            expect(profile._raw).to.be.a('string');
        });

        it('should set json property', function () {
            expect(profile._json).to.be.an('object');
        });

        describe('/POST/:id user', () => {
            it('should POST favorites to user', done => {
                var favorite = {
                    foodtruckId: newFoodTruck._id,
                    name: newFoodTruck.name,
                    photo: 'this is a photo image',
                    cuisine: newFoodTruck.cuisine
                };

                chai.request(app)
                    .post(`/api/users/${newUserProfile._id}/favorite`)
                    .send(favorite)
                    .end((err, res) => {
                        if (err) done(err);
                        done();
                    })
            });

            it('should POST review to user', (done) => {

                var review = {
                    foodtruckId: newFoodTruck._id,
                    name: 'Dan',
                    photo: 'Picture',
                    description: 'this is a description',
                    rating: 10
                };

                chai.request(app)
                    .post(`/api/users/${newUserProfile._id}/reviews`)
                    .send(review)
                    .end((err, res) => {
                        if (err) done(err);
                        done();
                    })
            })
        });


        describe('/GET/:id Food Trucks', () => {
            it('should GET current food truck by id', done => {
                chai.request(app)
                    .get(`/api/foodtrucks/${newFoodTruck._id}`)
                    .end((err, res) => {
                        const foodTruck = res.body[0];

                        expect(foodTruck.name).to.equal('food truck name');
                        expect(foodTruck.cuisine).to.equal('chinese');
                        done();
                    })
            });
        });

        describe('/GET/:id User', function () {

            it('should GET user by id', done => {
                chai.request(app)
                    .get(`/api/users/${newUserProfile._id}`)
                    .end((err, res) => {
                        const user = res.body[0];

                        expect(user.facebook.email).to.equal('jaredhanson@example.com');
                        expect(user.facebook.name).to.equal('Jared Hanson');
                        done();
                    })
            });

            it('should GET favorites user by id', done => {
                chai.request(app)
                    .get(`/api/users/${newUserProfile._id}/favorite`)
                    .end((err, res) => {
                        const favorite = res.body[0].favorites[0];

                        expect(favorite.cuisine).to.equal('chinese');
                        expect(favorite.photo).to.equal('this is a photo image');
                        expect(favorite.foodtruckId).to.equal(newFoodTruck._id.toString());
                        done();
                    })
            });
        });

        describe('/DELETE/:id Food Trucks', () => {
            it('should delete select food truck', done => {
                chai.request(app)
                    .del(`/api/foodtrucks/${newFoodTruck._id}`)
                    .end((err, res) => {
                        expect(res.body).to.equal('Successfully deleted record');
                        done();
                    })
            });
        });

        describe('/DELETE/:id User', () => {
            it('should DELETE user by id', done => {
                chai.request(app)
                    .del(`/api/users/${newUserProfile._id}`)
                    .end((err, res) => {
                        expect(res.body).to.equal('Successfully deleted record');
                        done();
                    })
            });
        });


    });

});



