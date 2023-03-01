const { Schema } = require('mongoose');
// DO WE EVEN NEED THIS??? 
// MIGHT BE ABLE TO SELF-CONTAIN IN USER MODEL
// WILL TEST LATER

const matchSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must be a valid email address'],
    },
    fullName: {
        type: String,
        required: true,
    },
    userId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})