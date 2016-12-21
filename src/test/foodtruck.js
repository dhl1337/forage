const mongoose = require('mongoose');
const FoodTruck = require('../server/foodtruck/FoodtruckModel');

const {expect} = require('chai');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
let should = chai.should();

chai.use(chaiHttp);

describe('Foodtruck', () => {
    beforeEach(done => {
        FoodTruck
            .remove({})
            .exec(err => done())
    });
    /**
     * Add new food truck
     */
    describe('/api/foodtrucks', (done) => {
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
                console.log('res', res);
                res.should.have.status(200);
                done();
            })
    })
});


