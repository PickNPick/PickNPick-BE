const mongoose = require('mongoose')

const FriendlistSchema = new mongoose.Schema({
    useremail: {
        type: String,
        required: true,
    },
    friendemail: {
        type: [String],
        default: []
    },
})

module.exports = mongoose.model('Friendlist', FriendlistSchema, 'friendlist')