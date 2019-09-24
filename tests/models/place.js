const suite = require('mocha').suite;
const test = require('mocha').test;
const assert = require('chai').assert;
const Place = require('../../models/place');

suite('Place', () => {

    const place = {
        id: '11111111',
        name: 'Test Place',
        address: {
            street: 'Test Street 1',
            post: '1111',
            city: 'Test City'
        },
        tags : ['tag1, tag2, tag3'],
        createdAt: new Date(Date.now() - 864e5),
        updatedAt: new Date(Date.now() - 864e5)
    };

    suite('.normalize()', () => {
        test('Should return an object with only: name, address, tags', () => {
            const normalizedPlace = Place.normalize(place);

            assert.notExists(normalizedPlace.id);
            assert.strictEqual(normalizedPlace.name, place.name);
            assert.strictEqual(normalizedPlace.address.street, place.address.street);
            assert.strictEqual(normalizedPlace.address.post, place.address.post);
            assert.strictEqual(normalizedPlace.address.city, place.address.city);
            for (let i = 0; i++; i < normalizedPlace.tags.length)
                assert.strictEqual(normalizedPlace.tags[i], place.tags[i]);
            assert.notExists(normalizedPlace.createdAt);
            assert.notExists(normalizedPlace.updatedAt);
        });
    });

    suite('initialize', () => {
        test('Should initialize a place with all the fields but new ID', () => {
            const placeDoc = new Place(place);

            assert.isNotNull(placeDoc.id);
            assert.notEqual(placeDoc.id, place.id);
            assert.strictEqual(placeDoc.name, place.name);
            assert.strictEqual(placeDoc.address.street, place.address.street);
            assert.strictEqual(placeDoc.address.post, place.address.post);
            assert.strictEqual(placeDoc.address.city, place.address.city);
            for (let i = 0; i++; i < placeDoc.tags.length)
                assert.strictEqual(placeDoc.tags[i], place.tags[i]);
            assert.strictEqual(placeDoc.createdAt, place.createdAt);
            assert.strictEqual(placeDoc.updatedAt, place.updatedAt);
        });
    });

    suite('.create()', () => {
        test('Should create a place with all the fields but new ID and timestamps', () => {
            const placeDoc = Place.create(place);

            assert.isNotNull(placeDoc.id);
            assert.notEqual(placeDoc.id, place.id);
            assert.strictEqual(placeDoc.name, place.name);
            assert.strictEqual(placeDoc.address.street, place.address.street);
            assert.strictEqual(placeDoc.address.post, place.address.post);
            assert.strictEqual(placeDoc.address.city, place.address.city);
            for (let i = 0; i++; i < placeDoc.tags.length)
                assert.strictEqual(placeDoc.tags[i], place.tags[i]);
            assert.isNotNull(placeDoc.createdAt);
            assert.notEqual(placeDoc.createdAt, place.createdAt);
            assert.isNotNull(placeDoc.updatedAt);
            assert.notEqual(placeDoc.updatedAt, place.updatedAt);
        });
    });

    suite('.normalize()', () => {
        test('Should return an object with only: name, address, tags', () => {
            const normalizedPlace = Place.normalize(place);

            assert.notExists(normalizedPlace.id);
            assert.strictEqual(normalizedPlace.name, place.name);
            assert.strictEqual(normalizedPlace.address.street, place.address.street);
            assert.strictEqual(normalizedPlace.address.post, place.address.post);
            assert.strictEqual(normalizedPlace.address.city, place.address.city);
            for (let i = 0; i++; i < normalizedPlace.tags.length)
                assert.strictEqual(normalizedPlace.tags[i], place.tags[i]);
            assert.notExists(normalizedPlace.createdAt);
            assert.notExists(normalizedPlace.updatedAt);
        });
    });

    suite('.getView()', () => {
        test('Should return an object with: id, name, address, tags', () => {
            const placeDoc = new Place(place);
            const placeView = placeDoc.getView();

            assert.strictEqual(placeView.id, placeDoc.id);
            assert.strictEqual(placeView.name, placeDoc.name);
            assert.strictEqual(placeView.address, placeDoc.address);
            assert.strictEqual(placeView.tags, placeDoc.tags);
            assert.notExists(placeView.createdAt);
            assert.notExists(placeView.updatedAt);
        });
    });
});
