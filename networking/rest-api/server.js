const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// In-memory data store for demonstration
let items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' },
];

// GET /api/items - Read all items
app.get('/api/items', (req, res) => {
  res.status(200).json(items);
});

// GET /api/items/:id - Read item by ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.status(200).json(item);
});

// POST /api/items - Create a new item
app.post('/api/items', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newItem = { id: items.length + 1, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// DELETE /api/items/:id - Delete an item
app.delete('/api/items/:id', (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id, 10));
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const deletedItem = items.splice(index, 1)[0];
  res.status(200).json(deletedItem);
});

// Start Express server
app.listen(PORT, () => {
  console.log(`REST API Server running at http://localhost:${PORT}`);
});
