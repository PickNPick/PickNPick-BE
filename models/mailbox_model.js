const mongoose = require('mongoose');

const MailSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true }
}, { _id: false });

const MailboxSchema = new mongoose.Schema({
  mails: {
    type: [MailSchema],
    required: true,
    default: [],
  },
  email:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Mailbox', MailboxSchema, 'mailbox');
