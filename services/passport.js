const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const jwtSecret = require('../config').jwt.secret;

passport.use('basic', new BasicStrategy(
    function(email, password, done) {
        User.findOne({ 'email': email }, (err, user) => {
            if (err) return done(err);
            if (!user) return done();
            user.validatePassword(password, (err, isValid) => {
                if (err) return done(err);
                if (!isValid) return done();
                return done(null, user)
            });
        });
    }
));

passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret
    },
    function(jwtPayload, done) {
        User.findById(jwtPayload.id, (err, user) => {
            return done(err, user)
        });
    }
));


