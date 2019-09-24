const User = require('../models/user');
const passport = require('passport');
const oauth = require('../services/oauth');
const passwordRule = require('../config').passwordRule;

exports.register = (req, res, next) => {
    if (!req.body.password || !req.body.password.match(passwordRule)) return res.status(400).json({
        message: 'Invalid password: Minimum 8 character, 1 lowercase, 1 uppercase, 1 number'
    });
    const user = new User(User.normalize(req.body));
    user.save()
        .then(user => res.status(201).json(user.getAuthInfo()))
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(400).json({message: 'User already exists with email: ' + user.email});
            }
        });
};

exports.jwt = (req, res, next) => {
    return res.json(req.user.getAuthInfo());
};

exports.basic = (req, res, next) => {
    passport.authenticate('basic', {session: false},(err, user) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({message: 'Incorrect email or password'});
        return res.json(user.getAuthInfo());
    })(req,res,next);
};

exports.google = (req, res, next) => {
    const code = req.body.code;
    if (!code) return res.status(400).json({message: 'Missing Google code'});
    oauth.getGoogleAccessToken(code, (err, token) => {
        if (err) return res.status(400).json({message: 'Incorrect Google code'});
        oauth.getGoogleProfile(token, (err, profile) => {
            if (err || !profile || !profile.googleId) return res.status(400).json({message: 'Incorrect Google code'});
            User.findOne({ 'googleId': profile.googleId }, (err, user) => {
                if (err) return next(err);
                if (user) {
                    return res.json(user.getAuthInfo());
                } else {
                    User.findOne({ 'email': profile.email }, (err, user) => {
                        if (err) return next(err);
                        if (user) {
                            user.googleId = profile.googleId;
                            user.save((err, user) => {
                                if (err) return next(err);
                                return res.json(user.getAuthInfo());
                            });
                        } else {
                            const newUser = new User(profile);
                            newUser.save((err, user) => {
                                if (err) return next(err);
                                return res.status(201).json(user.getAuthInfo());
                            })
                        }
                    });
                }
            });
        });
    });
};

exports.facebook = (req, res, next) => {
    const token = req.body.token;
    oauth.getFacebookProfile(token, (err, profile) => {
        if (err || !profile || !profile.facebookId) return res.status(400).json({message: 'Incorrect Facebook token'});
        User.findOne({ 'facebookId': profile.facebookId }, (err, user) => {
            if (err) return next(err);
            if (user) {
                return res.json(user.getAuthInfo());
            } else {
                User.findOne({ 'email': profile.email }, (err, user) => {
                    if (err) return next(err);
                    if (user) {
                        user.facebookId = profile.facebookId;
                        user.save((err, user) => {
                            if (err) return next(err);
                            return res.json(user.getAuthInfo());
                        });
                    } else {
                        const newUser = new User(profile);
                        newUser.save((err, user) => {
                            if (err) return next(err);
                            return res.status(201).json(user.getAuthInfo());
                        })
                    }
                });
            }
        });
    });
};

exports.googleCallback = (req, res, next) => {
    return res.json(req.query);
};

exports.facebookCallback =  (req, res, next) => {
    return res.json(req.query);
};
