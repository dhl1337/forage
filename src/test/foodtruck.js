const mongoose = require('mongoose');
const FoodTruck = require('../server/foodtruck/FoodtruckModel');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const Browser = require('zombie');
const assert = chai.assert;
let should = chai.should();

chai.use(chaiHttp);

describe('Foodtruck', () => {

    describe('GET /auth/facebook', () => {
        it('should get user id', function (done) {
            Browser.visit('http://localhost:9999/auth/facebook', (err, brw) => {
                if (err) throw err;

                //console.log('brw', brw);

                brw
                    .fill('email','aaa@gmail.com')
                    .fill('pass', 'password')
                    .pressButton('login', function (err,brow) {
                        console.log('brow', brow.assert);
                        brw.assert.success();
                        done();
                    });
            })
        });

    });

    /**
     * Add new food truck
     */
    // describe('POST /api/foodtrucks', () => {
    //     it('it should add new food truck', (done) => {
    //         const foodTruck = {
    //             name: 'food truck name',
    //             cuisine: 'chinese',
    //             phone: '1231231234',
    //             website: 'www.google.com',
    //             hours: {
    //                 sunday: 'CLOSED',
    //                 monday: 'CLOSED',
    //                 tuesday: '12:00 PM - 1:00 PM',
    //                 wednesday: '12:00 PM - 1:00 PM',
    //                 thursday: '12:00 PM - 1:00 PM',
    //                 friday: '12:00 PM - 1:00 PM',
    //                 saturday: '12:00 PM - 1:00 PM'
    //             },
    //             price: {min: '1', max: '2'},
    //             healthScore: '12',
    //             menu: [{name: 'RICE', price: '2'}]
    //         };
    //
    //         chai.request(server)
    //             .post('/api/foodtrucks')
    //             .send(foodTruck)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 done();
    //             })
    //     });
    // });

    /**
     * Get food truck
     */
    // describe('/api/foodtrucks', () => {
    //     it('it should get all food trucks', (done) => {
    //         chai.request(server)
    //             .get('/api/foodtrucks')
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 done();
    //             })
    //     })
    // })
});


