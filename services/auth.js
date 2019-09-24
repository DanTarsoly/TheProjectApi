const passport = require('passport');

exports.any = (req, res, next) => {
    passport.authenticate('jwt', {session: false},(err, user) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'Authentication failed' });
        req.user = user;
        next();
    })(req,res,next);
};

exports.admin = (req, res, next) => {
    passport.authenticate('jwt', {session: false},(err, user) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'Authentication failed' });
        if (user.role !== 'admin') return res.status(403).json({ message: 'Authorization failed' });
        req.user = user;
        next();
    })(req,res,next);
};
