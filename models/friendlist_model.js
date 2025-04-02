const mongoose = require('mongoose')

const FriendlistSchema = new mongoose.Schema({
    useremail: {
        type: String,
        required: true,
    },
    friends: {
        type: [{
            email: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }],
        default: []
    },
})

module.exports = mongoose.model('Friendlist', FriendlistSchema, 'friendlist')