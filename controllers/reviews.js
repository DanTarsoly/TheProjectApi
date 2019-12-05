const Review = require('../models/review');
const User = require('../models/user');

exports.create = (req, res, next) => {
    //TODO: Add checking for existing place and user or fix error message when missing
    const newReview = Review.create(req.body);
    newReview.user = req.user.id;
    newReview.save()
        .then(review => {
            review.user = req.user;
            res.status(201).json(review.getView())
        })
        .catch(next);
};

exports.findAll = (req, res, next) => {
    let limit = parseInt(req.query.count) || 50;
    let page = parseInt(req.query.page) || 1;
    let skip = (page - 1) * limit;
    const conditions = {};
    if (req.query.user)  conditions.user = req.query.user;
    if (req.query.place) conditions.place = req.query.place;
    Review.find(conditions)
        .limit(limit)
        .skip(skip)
        .sort(req.query.sort)
        .populate('user')
        .then(reviews => res.json(reviews.map(review => review.getView())))
        .catch(next);
};

exports.findOne = (req, res, next) => {
    Review.findById(req.params.id)
        .populate('user')
        .then(review => {
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }
            res.json(review.getView());
        })
        .catch(next);
};

exports.update = (req, res, next) => {
    const newReview = Review.normalize(req.body);
    delete newReview.user;
    delete newReview.place;
    Review.findById(req.params.id)
        .populate('user')
        .then(review => {
            if (!review) {
                return res.status(404).json({ message: 'Review not found!' });
            }
            if (review.user.id.toString() !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Review cannot be modified' });
            }
            const owner = review.user;
            Object.assign(review, newReview);
            review.save()
                .then(review => {
                    review.user = owner;
                    res.json(review.getView())
                })
                .catch(next);
        })
        .catch(next);
};

exports.delete = (req, res, next) => {
    Review.findById(req.params.id)
        .then(review => {
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }
            if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Review cannot be deleted' });
            }
            review.delete()
                .then(res.status(204).end())
                .catch(next);
        })
        .catch(next);
};
