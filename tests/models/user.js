const suite = require('mocha').suite;
const setup = require('mocha').setup;
const test = require('mocha').test;
const assert = require('chai').assert;
const User = require('../../models/user');

suite('User', () => {

    const user = {
        id: '11111111',
        email: 'test@mail.com',
        password: 'T3stPassword',
        name: 'Test User',
        googleId: '11111111',
        facebookId: '11111111',
        role: 'user',
        picture: 'http://address.com/picture.png',
        createdAt: new Date(Date.now() - 864e5),
        updatedAt: new Date(Date.now() - 864e5)
    };

    suite('initialize', () => {
        test('Should initialize a user with all the fields but new ID', () => {
            const userDoc = new User(user);

            assert.isNotNull(userDoc.id);
            assert.notEqual(userDoc.id, user.id);
            assert.strictEqual(userDoc.email, user.email);
            assert.strictEqual(userDoc.password, user.password);
            assert.strictEqual(userDoc.name, user.name);
            assert.strictEqual(userDoc.googleId, user.googleId);
            assert.strictEqual(userDoc.facebookId, user.facebookId);
            assert.strictEqual(userDoc.role, user.role);
            assert.strictEqual(userDoc.picture, user.picture);
            assert.strictEqual(userDoc.createdAt, user.createdAt);
            assert.strictEqual(userDoc.updatedAt, user.updatedAt);
        });
    });

    suite('.create()', () => {
        test('Should create a user with all the fields but new ID and timestamps', () => {
            const userDoc = User.create(user);

            assert.isNotNull(userDoc.id);
            assert.notEqual(userDoc.id, user.id);
            assert.strictEqual(userDoc.email, user.email);
            assert.strictEqual(userDoc.password, user.password);
            assert.strictEqual(userDoc.name, user.name);
            assert.strictEqual(userDoc.googleId, user.googleId);
            assert.strictEqual(userDoc.facebookId, user.facebookId);
            assert.strictEqual(userDoc.role, user.role);
            assert.strictEqual(userDoc.picture, user.picture);
            assert.isNotNull(userDoc.createdAt);
            assert.notEqual(userDoc.createdAt, user.createdAt);
            assert.isNotNull(userDoc.updatedAt);
            assert.notEqual(userDoc.updatedAt, user.updatedAt);
        });
    });

    suite('.normalize()', () => {
        test('Should return an object with only: email, password, name, googleId, facebookId, role, picture', () => {
            const normalizedUser = User.normalize(user);

            assert.notExists(normalizedUser.id);
            assert.strictEqual(normalizedUser.email, user.email);
            assert.strictEqual(normalizedUser.password, user.password);
            assert.strictEqual(normalizedUser.name, user.name);
            assert.strictEqual(normalizedUser.googleId, user.googleId);
            assert.strictEqual(normalizedUser.facebookId, user.facebookId);
            assert.strictEqual(normalizedUser.role, user.role);
            assert.strictEqual(normalizedUser.picture, user.picture);
            assert.notExists(normalizedUser.createdAt);
            assert.notExists(normalizedUser.updatedAt);
        });
    });

    suite('.getView()', () => {
        test('Should return an object with: id, name, picture', () => {
            const userDoc = new User(user);
            const userView = userDoc.getView();

            assert.strictEqual(userView.id, userDoc.id);
            assert.notExists(userView.email);
            assert.strictEqual(userView.name, userDoc.name);
            assert.notExists(userView.password);
            assert.notExists(userView.googleId);
            assert.notExists(userView.facebookId);
            assert.notExists(userView.role);
            assert.strictEqual(userView.picture, userDoc.picture);
            assert.notExists(userView.createdAt);
            assert.notExists(userView.updatedAt);
        });
    });
});
