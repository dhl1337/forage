import Foodtruck from '../foodtruck/FoodtruckModel';

const getReview = (req, res) => {
    Foodtruck
        .find({'reviews.userId': req.params.id}, (err, result) => {
            err ? res.status(500).send(err) : res.json(result);
        })
};

const addReview = (req, res) => {
    Foodtruck
        .findByIdAndUpdate(req.params.id, {$push: {'reviews': req.body}})
        .exec((err, result) => {
            err ? res.status(500).send(err) : res.json(result);
        })
};

export {getReview, addReview}