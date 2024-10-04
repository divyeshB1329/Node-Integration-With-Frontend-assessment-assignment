const Chat = require('../models/chatModel');

// Fetch previous messages
const getMessages = async (req, res) => {
    const messages = await Chat.find();
    res.render('chat', { messages });
};

// Save a new message
const saveMessage = async (data) => {
    const chat = new Chat(data);
    await chat.save(); 
};




module.exports = {getMessages, saveMessage}