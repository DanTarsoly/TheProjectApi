require('dotenv').config();
const path = require('path');
const merge = require('lodash').merge;

const requireProcessEnv = (name) => {
    if (!process.env[name]) {
        throw new Error(`Environment variable "${name}" is missing`);
    }
    return process.env[name];
};

const config = {
    all: {
        env: process.env.NODE_ENV || 'development',
        root: path.join(__dirname, '..'),
        server: {
            ip: process.env.IP || '0.0.0.0',
            port: process.env.PORT || 8080
        },
        apiRoot: process.env.API_ROOT || '',
        mongo: {
            url: process.env.MONGODB_URI || 'mongodb://localhost/the-project-api',
            options: {
                useNewUrlParser: true,
                useCreateIndex: true,
            }
        },
        jwt: {
            secret: requireProcessEnv('JWT_SECRET'),
            exprDays: 60
        },
        google: {
            appId: requireProcessEnv('GOOGLE_APP_ID'),
            appSecret: requireProcessEnv('GOOGLE_APP_SECRET'),
            apiHost: 'www.googleapis.com',
            profilePath: '/oauth2/v1/userinfo?alt=json',
            callbackURL: 'http://localhost:8080/auth/google/callback'
        },
        facebook: {
            appId: requireProcessEnv('FACEBOOK_APP_ID'),
            appSecret: requireProcessEnv('FACEBOOK_APP_SECRET'),
            apiHost: 'graph.facebook.com',
            profilePath: '/2361721657406820?fields=email,name,picture',
            callbackURL: 'http://localhost:8080/auth/facebook/callback'
        },
        passwordRule: new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))(?=.*[0-9]))(?=.{8,})"),
        masterKey: requireProcessEnv('MASTER_KEY'),
    },
    test: {
    },
    development: {
        server: {
            ip: process.env.IP || '127.0.0.1'
        },
        mongo:{
            options: {
                debug: true
            }
        }
    },
    production: {
        server: {
            ip: process.env.IP || undefined
        },
        mongo: {
            url: requireProcessEnv('MONGODB_URI')
        }
    }
};

module.exports = merge(config.all, config[config.all.env]);
