const express = require('express');
const socketIo = require('socket.io');
const path = require('path');
// require('dotenv').config();

const app = express();
const http = require('http').createServer(app);
const io = socketIo(http);
const chatController = require('./controllers/chatController');

const chatRoutes = require('./routes/chatRoutes');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.use('/', chatRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Receive chat messages from the client
  socket.on('chatMessage', async (data) => {

    // Emit the client's original message to all clients
    io.emit('chatMessage', { username: data.username, message: data.message });

    // Save the client's message to the database
    await chatController.saveMessage({ username: data.username, message: data.message });

    // Check if the message is "hello" and respond
    if (data.message.toLowerCase() === 'hello') {
      const serverResponse = { username: "Server", message: "hello from server" };

      // Emit the server's response message
      io.emit('chatMessage', serverResponse);

      // Save the server's response to the database
      await chatController.saveMessage(serverResponse);
    }
    if (data.message.toLowerCase() === 'kese ho') {
      const serverResponse = { username: "Server", message: "achaa hun.." };

      // Emit the server's response message
      io.emit('chatMessage', serverResponse);

      // Save the server's response to the database
      await chatController.saveMessage(serverResponse);
    }
  });
});

// Start server
http.listen(3000, () => {
  console.log('Listening on Port 3000');
});
