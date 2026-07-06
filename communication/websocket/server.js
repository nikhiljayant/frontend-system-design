const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;

// Serve static HTML/JS files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Create HTTP server
const server = http.createServer(app);

// Bind Socket.io to the HTTP server
const io = new Server(server);

// In-memory list to store chat messages
const messages = ['Server: Welcome! Connection established.'];

// Handle new client connections
io.on('connection', (socket) => {
  // Send the history of messages to the newly connected client
  socket.emit('history', messages);

  // Listen for 'message' events from client
  socket.on('message', (msg) => {
    if (msg) {
      messages.push(msg);
      // Broadcast the message to all connected clients
      io.emit('message', msg);
    }
  });
});

// Start the HTTP and Socket.io server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
