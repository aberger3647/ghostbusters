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
        firstName: {
            type: String,
            required: true,
        },
        reviews: [reviewSchema],
        image: {
            type: String,
            default: null,
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
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

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

// DO WE NEED OR CARE?
userSchema.virtual('totalMatches').get(function () {
    return this.matches.length;
})

const User = model('User', userSchema);

module.exports = User;