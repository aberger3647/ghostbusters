const { Schema, model } = require('mongoose');

const preferenceSchema = new Schema(
    {
        minAge: {
            type: String,
            required: true,
        },
        maxAge: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true
        },
        minHeight: {
            type: String,
            required: true,
        },
        maxHeight: {
            type: String,
            required: true,
        },
        religion: {
            type: String,
        },
        politics: {
            type: String,
        },
        smoking: {
            type: String,
        },
        drinking: {
            type: String,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
);

const Preference = model('Preference', preferenceSchema);

module.exports = Preference;