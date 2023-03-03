const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
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
            type: Boolean,
        },
        drinking: {
            type: Boolean,
        },
        bio: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
);

const Profile = model('Profile', profileSchema);

module.exports = Profile;