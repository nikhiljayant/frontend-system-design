const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Remove the default 'X-Powered-By: Express' to avoid exposing server info.
app.disable('x-powered-by');

// Security Headers Middleware
app.use((req, res, next) => {
  // 1. Content Security Policy (CSP)
  // Restricts where resources (scripts, styles, images) can be loaded from.
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self';"
  );

  // 2. X-Frame-Options
  // Prevents Clickjacking attacks by forbidding the page from being rendered in an iframe.
  res.setHeader('X-Frame-Options', 'DENY');

  // 3. X-Content-Type-Options
  // Disables MIME-type sniffing, forcing the browser to stick to the declared Content-Type.
  res.setHeader('X-Content-Type-Options', 'nosniff'); // TAUGHT

  // 4. Strict-Transport-Security (HSTS)
  // Forces the browser to communicate only via HTTPS (max-age is 1 year).
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload'); // TAUGHT

  // 5. Referrer-Policy
  // Controls how much referrer info (URL of the origin page) is sent with requests.
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin'); // TAUGHT

  // 6. Permissions-Policy
  // Restricts access to sensitive browser features (camera, geolocation, microphone).
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // 7. Cross-Origin-Opener-Policy (COOP)
  // Isolates the browsing context group to prevent cross-origin window manipulation.
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');

  // 8. Cross-Origin-Embedder-Policy (COEP)
  // Prevents loading cross-origin resources that do not explicitly opt-in.
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

  // 9. Cross-Origin-Resource-Policy (CORP)
  // Restricts which origins are allowed to read the server's resource responses.
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');

  // 10. X-XSS-Protection
  // Disables the legacy XSS Filter, as modern browsers use CSP and the old filter has bugs.
  res.setHeader('X-XSS-Protection', '0');

  // 11. X-Powered-By
  // Set to an empty string — header is present but exposes no server info.
  res.setHeader('X-Powered-By', ''); // TAUGHT

  next();
});

// Root route returning a simple JSON response with active headers
app.get('/', (req, res) => {
  res.json({
    status: 'secure',
    message: 'Server is running with all important security headers configured.',
    timestamp: new Date().toISOString()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(` Security Headers Server is Running!`);
  console.log(` Port: http://localhost:${PORT}`);
  console.log(`==================================================`);
});

