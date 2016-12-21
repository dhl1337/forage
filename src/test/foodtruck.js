const mongoose = require('mongoose');
const FoodTruck = require('../server/foodtruck/FoodtruckModel');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const Browser = require('zombie');
let should = chai.should();

chai.use(chaiHttp);

describe('Foodtruck', () => {
    beforeEach((done) => {
        FoodTruck
            .remove({}, err => {
                done();
            })
    });

    it('should login with facebook', (done) => {
        Browser.visit('http://127.0.0.1:9999/auth/facebook',function (err,brw) {

            if(err){
                throw err;
            }

            brw.fill('email','aaa@gmail.com').fill('pass', 'password')
                .pressButton('ui facebook button', function (err,brow) {
                    brw.assert.success();
                    done();
                });

        });
    });

    /**
     * Add new food truck
     */
    describe('POST /api/foodtrucks', () => {
        it('it should add new food truck', (done) => {
            const foodTruck = {
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

            chai.request(server)
                .post('/api/foodtrucks')
                .send(foodTruck)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });
    });

    /**
     * Get food truck
     */
    describe('/api/foodtrucks', () => {
        it('it should get all food trucks', (done) => {
            chai.request(server)
                .get('/api/foodtrucks')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })
});


