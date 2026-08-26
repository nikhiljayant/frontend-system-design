// Main Server Entry Point
// Imports separate modules for CSR, SSR, and SSG rendering patterns.

const express = require('express');
const path = require('path');
const fs = require('fs');

const { getProducts } = require('./data');
const handleCSR = require('./csr');
const handleSSR = require('./ssr');

const app = express();
const PORT = 3000;

// 1. CSR Route (Client-Side Rendering) - Handled by csr.js
app.get('/csr', handleCSR);

// 2. SSR Route (Server-Side Rendering) - Handled by ssr.js
app.get('/ssr', handleSSR);

// 3. SSG Route (Static Site Generation) - Serves pre-built static HTML from dist/ssg.html
app.get('/ssg', (req, res) => {
  const ssgFile = path.join(__dirname, 'dist', 'ssg.html');
  if (fs.existsSync(ssgFile)) {
    res.sendFile(ssgFile);
  } else {
    res.status(404).send('<h2>SSG page not found.</h2><p>Please run <code>npm run build</code> first!</p><p><a href="/">Back to Dashboard</a></p>');
  }
});

// API Endpoint (Consumed by CSR client-side script)
app.get('/api/products', (req, res) => {
  res.json(getProducts());
});

// Dashboard Page
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Rendering Patterns Demo</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 2rem; background: #0f172a; color: #f8fafc; }
    .container { max-width: 900px; margin: auto; }
    h1 { text-align: center; color: #38bdf8; }
    p.subtitle { text-align: center; color: #94a3b8; margin-bottom: 2rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
    .card { background: #1e293b; padding: 1.5rem; border-radius: 12px; border: 1px solid #334155; display: flex; flex-direction: column; justify-content: space-between; }
    .title-csr { color: #38bdf8; }
    .title-ssr { color: #f87171; }
    .title-ssg { color: #34d399; }
    ul { padding-left: 1.2rem; color: #cbd5e1; font-size: 0.95rem; }
    li { margin-bottom: 0.5rem; }
    a.btn { display: block; text-align: center; margin-top: 1rem; padding: 0.6rem; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; }
    a.btn:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Frontend Rendering Patterns</h1>
    <p class="subtitle">Separate files for CSR, SSR, and SSG modules</p>
    
    <div class="grid">
      <div class="card">
        <div>
          <h3 class="title-csr">1. CSR (csr.js)</h3>
          <p>Server sends empty HTML shell. Browser fetches data asynchronously and updates DOM.</p>
          <ul>
            <li><strong>HTML Source:</strong> Generated in browser</li>
            <li><strong>Source File:</strong> <code>csr.js</code></li>
          </ul>
        </div>
        <a href="/csr" class="btn">View CSR Demo</a>
      </div>

      <div class="card">
        <div>
          <h3 class="title-ssr">2. SSR (ssr.js)</h3>
          <p>Server fetches data and constructs full HTML string dynamically on EVERY incoming request.</p>
          <ul>
            <li><strong>HTML Source:</strong> Generated per request</li>
            <li><strong>Source File:</strong> <code>ssr.js</code></li>
          </ul>
        </div>
        <a href="/ssr" class="btn">View SSR Demo</a>
      </div>

      <div class="card">
        <div>
          <h3 class="title-ssg">3. SSG (ssg.js)</h3>
          <p>HTML page is generated ONCE during build time and served statically for all requests.</p>
          <ul>
            <li><strong>HTML Source:</strong> Generated at build time</li>
            <li><strong>Source File:</strong> <code>ssg.js</code></li>
          </ul>
        </div>
        <a href="/ssg" class="btn">View SSG Demo</a>
      </div>
    </div>
  </div>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running at: http://localhost:${PORT}`);
  console.log(`   - CSR: http://localhost:${PORT}/csr`);
  console.log(`   - SSR: http://localhost:${PORT}/ssr`);
  console.log(`   - SSG: http://localhost:${PORT}/ssg`);
});
