const { Schema, model } = require('mongoose');

const preferenceSchema = new Schema(
    {
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true
        },
        height: {
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