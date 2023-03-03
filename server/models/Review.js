const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `reviews` array in User.js
const reviewSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 500
        },
        firstName: {
            type: String,
            required: true
        },
    },
    { timestamps: { createdAt: 'created_at'}},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

module.exports = reviewSchema;