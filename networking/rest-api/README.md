# Simple REST API Example (Node.js & Express)

A minimal REST API example demonstrating standard HTTP methods (GET, POST, DELETE), resource routing, JSON payloads, and status codes.

## Files Overview
- [server.js](file:///home/inxee-frontend/nikhil/frontend-system-design/networking/rest-api/server.js): Express server with RESTful endpoints (`/api/items`).
- [client.js](file:///home/inxee-frontend/nikhil/frontend-system-design/networking/rest-api/client.js): Client script making HTTP requests with native `fetch`.
- [package.json](file:///home/inxee-frontend/nikhil/frontend-system-design/networking/rest-api/package.json): Package manifest and runner scripts.

## REST Conventions Demonstrated
- **Resource Nouns**: `/api/items` (plural resource naming).
- **HTTP Verbs**: `GET` (read), `POST` (create), `DELETE` (remove).
- **HTTP Status Codes**: `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`.

## How to Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Server**:
   ```bash
   npm run start:server
   ```

3. **Run the Client** (in a separate terminal):
   ```bash
   npm run start:client
   ```
