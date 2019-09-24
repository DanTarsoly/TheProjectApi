const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true
    },
    address: {
        street: {
            type: String,
            required: [true, 'Street address is required'],
            trim: true
        },
        post: {
            type: String,
            required: [true, 'Postal code is required'],
            trim: true
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true
        }
    },
    tags: {
        type: [String],
        validate: {
            validator: (tags) => { return tags.length <= 5 },
            message: 'Too many tags: maximum 5'
        }
    }
}, {
    timestamps: true,
    collation: {
        locale: "en"
    }
});

placeSchema.methods = {
    getView() {
        return {
            id: this.id,
            name: this.name,
            address: this.address,
            tags: this.tags
        }
    },
};

placeSchema.statics = {
    normalize(place) {
        const normalized = {};
        if (place.name !== undefined) normalized.name = place.name;
        if (place.address !== undefined) normalized.address = place.address;
        if (place.tags !== undefined) normalized.tags = place.tags;
        return normalized;
    },

    create(place) {
        return new mongoose.model('place', placeSchema)(this.normalize(place));
    }
};

module.exports = mongoose.model('place', placeSchema);
