const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Enable JSON request body parsing
app.use(express.json());

// Serve static HTML/JS files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory list to store messages
const messages = ['Server: Welcome! Connection established.'];

// HTTP GET endpoint to retrieve all messages (polled by frontend)
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// HTTP POST endpoint to add a new message to our list
app.post('/api/messages', (req, res) => {
  const { message } = req.body;
  if (message) {
    messages.push(message);
    res.status(201).json({ success: true });
  } else {
    res.status(400).json({ error: 'Message content is missing' });
  }
});

// Start the web server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
