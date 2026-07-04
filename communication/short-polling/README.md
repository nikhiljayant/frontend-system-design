# Short Polling Demonstration

A complete, educational implementation of **Short Polling** using a Node.js (Express) backend and a vanilla HTML/CSS/JS frontend.

## 🚀 How to Run

1. Make sure you have Node.js installed.
2. Navigate to this directory in your terminal:
   ```bash
   cd communcation/short-polling
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
   http://localhost:3000
   ```

## ⚙️ Key Concepts Implemented

- **Recursive `setTimeout` Polling**: The frontend uses a self-scheduling `setTimeout` loop. This avoids the request-stacking issue of `setInterval` when network connections are slow or delayed.
- **Dynamic Controls**: Includes a slider on the dashboard to adjust the polling interval in real-time (from 1 second up to 10 seconds).
- **Simulated Background Updates**: The server auto-generates a system event logs every 12 seconds to mimic external changes that the polling client must fetch.
- **Telemetry Indicators**: Displays total requests, network response time (latency), and data overhead received.
