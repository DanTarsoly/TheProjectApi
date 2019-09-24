const suite = require('mocha').suite;
const test = require('mocha').test;
const assert = require('chai').assert;
const Review = require('../../models/review');

suite('Review', () => {

    const review = {
        id: '11111111',
        user: null,
        place: null,
        rating: 3,
        comment: 'Some comment.',
        createdAt: new Date(Date.now() - 864e5),
        updatedAt: new Date(Date.now() - 864e5)
    };

    suite('initialize', () => {
        test('Should initialize a review with all the fields but new ID', () => {
            const reviewDoc = new Review(review);

            assert.isNotNull(reviewDoc.id);
            assert.notEqual(reviewDoc.id, review.id);
            assert.strictEqual(reviewDoc.user, review.user);
            assert.strictEqual(reviewDoc.place, review.place);
            assert.strictEqual(reviewDoc.rating, review.rating);
            assert.strictEqual(reviewDoc.comment, review.comment);
            assert.strictEqual(reviewDoc.createdAt, review.createdAt);
            assert.strictEqual(reviewDoc.updatedAt, review.updatedAt);
        });
    });

    suite('.create()', () => {
        test('Should create a review with all the fields but new ID and timestamps', () => {
            const reviewDoc = Review.create(review);

            assert.isNotNull(reviewDoc.id);
            assert.notEqual(reviewDoc.id, review.id);
            assert.strictEqual(reviewDoc.user, review.user);
            assert.strictEqual(reviewDoc.place, review.place);
            assert.strictEqual(reviewDoc.rating, review.rating);
            assert.strictEqual(reviewDoc.comment, review.comment);
            assert.isNotNull(reviewDoc.createdAt);
            assert.notEqual(reviewDoc.createdAt, review.createdAt);
            assert.isNotNull(reviewDoc.updatedAt);
            assert.notEqual(reviewDoc.updatedAt, review.updatedAt);
        });
    });

    suite('.normalize()', () => {
        test('Should return an object with only: user, place, rating, comment', () => {
            const normalizedReview = Review.normalize(review);

            assert.notExists(normalizedReview.id);
            assert.strictEqual(normalizedReview.user, review.user);
            assert.strictEqual(normalizedReview.place, review.place);
            assert.strictEqual(normalizedReview.rating, review.rating);
            assert.strictEqual(normalizedReview.comment, review.comment);
            assert.notExists(normalizedReview.createdAt);
            assert.notExists(normalizedReview.updatedAt);
        });
    });

    suite('.getView()', () => {
        test('Should return an object with: id, user(populated), place, rating, comment, createdAt', () => {
            const reviewDoc = new Review(review);
            const reviewView = reviewDoc.getView();

            assert.strictEqual(reviewView.id, reviewDoc.id);
            assert.isNull(reviewView.user.id);
            assert.strictEqual(reviewView.user.name, 'Deleted user');
            assert.isNull(reviewView.user.picture);
            assert.strictEqual(reviewView.place, reviewDoc.place);
            assert.strictEqual(reviewView.rating, reviewDoc.rating);
            assert.strictEqual(reviewView.comment, reviewDoc.comment);
            assert.strictEqual(reviewView.createdAt, reviewDoc.createdAt);
            assert.notExists(reviewView.updatedAt);
        });
    });
});
