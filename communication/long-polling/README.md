# Long Polling Demonstration

A complete, educational implementation of **Long Polling** using a Node.js (Express) backend and a vanilla HTML/CSS/JS frontend.

## 🚀 How to Run

1. Make sure you have Node.js installed.
2. Navigate to this directory in your terminal:
   ```bash
   cd communcation/long-polling
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:4000
   ```

## ⚙️ Key Concepts Implemented

- **Request Holding (Suspension)**: When the client calls `GET /api/messages`, if there are no new messages, the server holds the response object in a queue without sending anything, keeping the HTTP connection open.
- **Immediate Broadcast**: The moment any client posts a new message via `POST /api/messages`, the server flushes all pending requests immediately with the new data.
- **Connection Refresh / Timeout**: To avoid connections staying open indefinitely, the server closes requests after 30 seconds with an empty response. The client immediately sends a new request to start the next cycle.
- **Recursive Calling**: The client starts the next request immediately upon receiving a response (success or timeout) to preserve the continuous connection.
