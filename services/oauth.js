const https = require('../services/https');
const config = require('../config');
const {google} = require('googleapis');

const googleClient = new google.auth.OAuth2(
    config.google.appId,
    config.google.appSecret,
    config.google.callbackURL
);

const pictureSize = 50;

exports.getGoogleAccessToken = (code, done) => {
    googleClient.getToken(code, (err, tokens) => {
        if (err) return done(err);
        return done(null, tokens.access_token);
    });
};

exports.getGoogleProfile = (token, done) => {
    const headers = {
        Authorization: ' Bearer ' + token
    };
    const hostname = config.google.apiHost;
    const path = config.google.profilePath;
    https.getJson(hostname, path, headers, (err, status, body) => {
        if (err) return done(err);
        if (status !== 200) return done();
        return done(null, {
            googleId: body.id,
            email: body.email,
            name: body.name,
            picture: `${body.picture}?sz=${pictureSize}`
        });
    });
};

exports.getFacebookProfile = (token, done) => {
    const headers = {
        Authorization: ' Bearer ' + token
    };
    const hostname = config.facebook.apiHost;
    const path = config.facebook.profilePath;
    https.getJson(hostname, path, headers, (err, status, body) => {
        if (err) return done(err);
        if (status !== 200) return done(null);
        return done(null, {
            facebookId: body.id,
            email: body.email,
            name: body.name,
            picture: `https://graph.facebook.com/${body.id}/picture?sz=${pictureSize}`
        });
    });
};
