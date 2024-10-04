const mongoose = require('mongoose');
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/TOPS_DB');

const Schema = mongoose.Schema

const chatSchema = new Schema({
  username: String,
  message: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
