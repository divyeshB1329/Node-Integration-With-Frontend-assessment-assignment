const socket = io();
const form = document.getElementById('form');
const inputMessage = document.getElementById('message');
const messages = document.getElementById('messages');

// Clear messages on page reload
window.onload = () => {
  messages.innerHTML = ''; // Clear old messages from the list
};
// Handle form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputMessage.value) {
    const message = {message: inputMessage.value};
    socket.emit('chatMessage', message);
    inputMessage.value = '';
  }
});

// Listen for chat messages from the server
socket.on('chatMessage', (message) => {
  const item = document.createElement('li');
  item.textContent = `
  ${message.message}`;
  messages.appendChild(item);
});
