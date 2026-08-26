// ====================================================
// CSR (Client-Side Rendering) Module
// Concept: Server sends empty HTML shell; Client JS fetches data & renders DOM.
// ====================================================

function handleCSR(req, res) {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSR - Client-Side Rendering</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #f4f6f9; }
    .card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 600px; margin: auto; }
    .badge { background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
    ul { list-style: none; padding: 0; }
    li { padding: 8px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
    .loading { color: #666; font-style: italic; }
    a { color: #2563eb; text-decoration: none; display: inline-block; margin-top: 1rem; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">CSR (Client-Side Rendering)</span>
    <h2>Product Catalog</h2>
    <!-- Empty container initially; client-side JS populates this -->
    <div id="content" class="loading">Fetching products via client-side fetch()...</div>
    <a href="/">← Back to Dashboard</a>
  </div>

  <script>
    // Browser JavaScript executes after page load
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const renderTime = new Date().toLocaleString();
        const html = \`
          <p><strong>Rendered On Client At:</strong> \${renderTime}</p>
          <p><em>Server sent empty HTML shell. Client JS fetched data & rendered this content.</em></p>
          <ul>
            \${data.map(p => \`<li><span>\${p.name}</span> <strong>\${p.price}</strong></li>\`).join('')}
          </ul>
        \`;
        document.getElementById('content').innerHTML = html;
      });
  </script>
</body>
</html>`);
}

module.exports = handleCSR;
