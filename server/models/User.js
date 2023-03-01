const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const reviewSchema = require('./Review');
// DO WE EVEN NEED THIS?
const matchSchema = require('./Match');
// PROBABLY NOT

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must be a valid email address'],
        },
        password: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true,
        },
        reviews: [reviewSchema],
        matches: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.virtual('totalMatches').get(function () {
    return this.matches.length;
})

const User = model('User', userSchema);

module.exports = User;