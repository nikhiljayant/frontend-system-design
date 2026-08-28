// ====================================================
// SSG (Static Site Generation) Build Script
// Concept: Pre-renders static HTML file ahead of time during build step.
// ====================================================

const fs = require('fs');
const path = require('path');
const { getProducts } = require('./data');

function buildSSG() {
  // Fetch data ONCE at build time
  const products = getProducts();
  const buildTime = new Date().toLocaleString();

  // Generate complete static HTML string
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SSG - Static Site Generation</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #f4f6f9; }
    .card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 600px; margin: auto; }
    .badge { background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
    ul { list-style: none; padding: 0; }
    li { padding: 8px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
    a { color: #2563eb; text-decoration: none; display: inline-block; margin-top: 1rem; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">SSG (Static Site Generation)</span>
    <h2>Product Catalog</h2>
    <p><strong>Page Built At:</strong> ${buildTime}</p>
    <p><em>HTML generated ahead of time during build step. Served as static file. Re-build required for updates.</em></p>
    <ul>
      ${products.map(p => `<li><span>${p.name}</span> <strong>${p.price}</strong></li>`).join('')}
    </ul>
    <a href="/">← Back to Dashboard</a>
  </div>
</body>
</html>`;

  // Create dist folder if it doesn't exist
  const distDir = path.join(__dirname, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  // Write pre-rendered HTML file to dist/ssg.html
  fs.writeFileSync(path.join(distDir, 'ssg.html'), htmlContent);
  console.log('✅ SSG Page built successfully at dist/ssg.html');
}

// Execute build when file is run directly
if (require.main === module) {
  buildSSG();
}

module.exports = buildSSG;
