const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
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