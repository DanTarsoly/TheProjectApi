const Place = require('../models/place');

exports.create = (req, res, next) => {
    const newPlace = Place.create(req.body);
    newPlace.save()
        .then(place => res.status(201).json(place.getView()))
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(400).json({ message: 'Place already exists with name: ' + newPlace.name});
            }
            next(err);
        });
};

exports.findAll = (req, res, next) => {
    let limit = parseInt(req.query.count) || 50;
    let page = parseInt(req.query.page) || 1;
    let skip = (page - 1) * limit;
    let conditions = {};
    if (req.query.q){
        conditions = {$or:[
            {name: new RegExp('^' + req.query.q, 'i')},
            {tags: new RegExp('^' + req.query.q + '$', 'i')}
        ]};
    }
    Place.find(conditions)
        .limit(limit)
        .skip(skip)
        .sort(req.query.sort)
        .then(places => res.json(places.map(place => place.getView())))
        .catch(next);
};

exports.findOne = (req, res, next) => {
    Place.findById(req.params.id)
        .then(place => {
            if (!place) {
                return res.status(404).json({ message: 'Place not found' });
            }
            res.json(place.getView());
        })
        .catch(next);
};

exports.update = (req, res, next) => {
    const newPlace = Place.normalize(req.body);
    Place.findById(req.params.id)
        .then(place => {
            if (!place) {
                return res.status(404).json({ message: 'Place not found' });
            }
            Object.assign(place, newPlace).save()
                .then(place => res.json(place.getView()))
                .catch(next);
        })
        .catch(next);
};

exports.delete = (req, res, next) => {
    Place.findById(req.params.id)
        .then( place => {
            if (!place) {
                return res.status(404).json({ message: 'Place not found' });
            }
            place.delete()
                .then(res.status(204).end())
                .catch(next);
        })
        .catch(next);
};
