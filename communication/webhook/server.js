const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json()); // Tells express to automatically parse JSON payloads
app.use(express.static(path.join(__dirname, 'public'))); // Serves html/css/js files from public folder

let webhooks = []; // Array to store registered webhooks: { id, url }
let logs = [];     // Array to store simple activity logs: { type, timestamp, message, payload }

// 1. Register a webhook URL
app.post('/api/webhooks', (req, res) => {
  webhooks.push({ 
    id: Date.now().toString(), 
    url: req.body.url 
  });
  res.sendStatus(201);
});

// 2. Get all registered webhook URLs
app.get('/api/webhooks', (req, res) => {
  res.json(webhooks);
});

// 3. Delete a registered webhook
app.delete('/api/webhooks/:id', (req, res) => {
  webhooks = webhooks.filter(w => w.id !== req.params.id);
  res.sendStatus(200);
});

// 4. Trigger an event (loops and sends HTTP POST to all registered webhooks)
app.post('/api/trigger-event', (req, res) => {
  const { eventType, payload } = req.body;

  webhooks.forEach(async (webhook) => {
    try {
      // Send the POST request to the subscriber URL
      const response = await axios.post(webhook.url, { 
        event: eventType, 
        data: payload 
      });

      // Log success response status
      logs.push({
        type: 'outbound',
        timestamp: new Date(),
        message: `Sent '${eventType}' Webhook to ${webhook.url} - Status ${response.status}`,
        payload: { sentData: payload, responseBody: response.data }
      });
    } catch (error) {
      // Log failure (e.g. invalid URL, target server offline)
      logs.push({
        type: 'outbound',
        timestamp: new Date(),
        message: `Failed to send to ${webhook.url} - Error: ${error.message}`,
        payload: { error: error.message }
      });
    }
  });

  res.sendStatus(200);
});

// 5. Receiver endpoint (simulates the external server receiving our webhooks)
app.post('/api/webhook-receiver', (req, res) => {
  logs.push({
    type: 'inbound',
    timestamp: new Date(),
    message: `Receiver endpoint: Successfully received event: ${req.body.event}`,
    payload: req.body
  });
  res.status(200).send('OK');
});

// 6. Get activity logs
app.get('/api/logs', (req, res) => {
  res.json(logs);
});

// 7. Clear all activity logs
app.post('/api/logs/clear', (req, res) => {
  logs = [];
  res.sendStatus(200);
});

// Run server on Port 5001
app.listen(5001, () => {
  console.log('Server running at http://localhost:5001');
});
