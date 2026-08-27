// ====================================================
// SSR (Server-Side Rendering) Module
// Concept: Server fetches data on EVERY request & builds complete HTML page.
// ====================================================

const { getProducts } = require('./data');

function handleSSR(req, res) {
  // Fetch data on the server for each request
  const products = getProducts();
  const requestTime = new Date().toLocaleString();

  // Construct complete HTML dynamically on the server
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SSR - Server-Side Rendering</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #f4f6f9; }
    .card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 600px; margin: auto; }
    .badge { background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
    ul { list-style: none; padding: 0; }
    li { padding: 8px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
    a { color: #2563eb; text-decoration: none; display: inline-block; margin-top: 1rem; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">SSR (Server-Side Rendering)</span>
    <h2>Product Catalog</h2>
    <p><strong>Rendered On Server At:</strong> ${requestTime}</p>
    <p><em>Server generated complete HTML dynamically on incoming request. Refreshing updates timestamp!</em></p>
    <ul>
      ${products.map(p => `<li><span>${p.name}</span> <strong>${p.price}</strong></li>`).join('')}
    </ul>
    <a href="/">← Back to Dashboard</a>
  </div>
</body>
</html>`;

  res.send(html);
}

module.exports = handleSSR;
