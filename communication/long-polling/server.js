const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory list to store all messages
const messages = ['Server: Welcome! Long Polling connection established.'];

// List of active long-polling connections waiting for updates
let waitingClients = [];

// Endpoint to get messages via long-polling
app.get('/api/messages', (req, res) => {
  // The client passes the count of messages it currently has
  const lastIndex = parseInt(req.query.lastIndex, 10) || 0;

  // 1. If the server has new messages since lastIndex, respond immediately
  if (messages.length > lastIndex) {
    return res.json(messages.slice(lastIndex));
  }

  // 2. Otherwise, hold the request open (long poll) until a new message arrives
  const timeoutId = setTimeout(() => {
    // If timeout (e.g. 30 seconds) is reached without updates, send an empty array
    waitingClients = waitingClients.filter(client => client.res !== res);
    res.json([]);
  }, 30000);

  // Keep track of the client connection and the last index they requested
  waitingClients.push({ res, lastIndex, timeoutId });
});

// Endpoint to add a new message and resolve all waiting long-poll requests
app.post('/api/messages', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message content is missing' });
  }

  // Add the message to the database
  messages.push(message);

  // Notify and respond to all waiting clients with their respective new messages
  const currentClients = waitingClients;
  waitingClients = []; // Reset waiting list

  currentClients.forEach(client => {
    clearTimeout(client.timeoutId); // Cancel the timeout
    const newMsgs = messages.slice(client.lastIndex);
    client.res.json(newMsgs); // Send the updates immediately
  });

  res.status(201).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Long Polling Server is running at http://localhost:${PORT}`);
});
