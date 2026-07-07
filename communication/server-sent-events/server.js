const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Serve static frontend files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * SSE Endpoint: Establishes a persistent connection to stream events.
 */
app.get('/server-sent-events', (req, res) => {
  // Set headers required for Server-Sent Events (SSE)
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  console.log('Client connected to SSE stream');

  // Send an initial message immediately
  // Note: SSE data must start with 'data: ' and end with double newlines '\n\n'
  res.write(`data: Connection established!\n\n`);

  // Stream current server time every 2 seconds
  const intervalId = setInterval(() => {
    const serverTime = new Date().toLocaleTimeString();
    res.write(`data: Server Time: ${serverTime}\n\n`);
  }, 5000);

  // Clean up when the client closes the connection
  req.on('close', () => {
    clearInterval(intervalId);
    console.log('Client disconnected');
  });
});

app.listen(PORT, () => {
  console.log(`SSE Server running at http://localhost:${PORT}`);
});
