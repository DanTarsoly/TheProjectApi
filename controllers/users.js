const User = require('../models/user');
const passwordRule = require('../config').passwordRule;

exports.create = (req, res, next) => {
    const newUser = User.create(req.body);
    if (!req.body.password || !req.body.password.match(passwordRule)) return res.status(400).json({
        message: 'Invalid password: Minimum 8 character, 1 lowercase, 1 uppercase, 1 number'
    });
    newUser.save()
        .then(user => res.status(201).json(user.getView()))
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(400).json({ message: 'User already exists with email: ' + newUser.email });
            }
            next(err);
        });
};

exports.findAll = (req, res, next) => {
    let limit = parseInt(req.query.count) || 50;
    let page = parseInt(req.query.page) || 1;
    let skip = (page - 1) * limit;
    const conditions = {};
    if (req.query.email) conditions.email = new RegExp('^' + req.query.email, 'i');
    User.find(conditions)
        .limit(limit)
        .skip(skip)
        .sort(req.query.sort)
        .then(users => res.json(users.map(user => user.getView())))
        .catch(next);
};

exports.findOne = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user.getView());
        })
        .catch(next);
};

exports.update = (req, res, next) => {
    const newUser = User.normalize(req.body);
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            Object.assign(user, newUser).save()
                .then(user => res.json(user.getView()))
                .catch(next);
        })
        .catch(next);
};

exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.delete()
                .then(res.status(204).end())
                .catch(next);
        })
        .catch(next);
};
