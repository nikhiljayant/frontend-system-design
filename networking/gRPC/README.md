# Simple gRPC Example (Node.js)

A minimal gRPC example demonstrating Protocol Buffers schema, a gRPC server, and a gRPC client using `@grpc/grpc-js`.

## Files Overview
- [greeter.proto](file:///home/inxee-frontend/nikhil/frontend-system-design/networking/gRPC/greeter.proto): Service definition and payload schemas.
- [server.js](file:///home/inxee-frontend/nikhil/frontend-system-design/networking/gRPC/server.js): Implements the `GreeterService` server.
- [client.js](file:///home/inxee-frontend/nikhil/frontend-system-design/networking/gRPC/client.js): Connects to the server and executes the `SayHello` RPC.
- [package.json](file:///home/inxee-frontend/nikhil/frontend-system-design/networking/gRPC/package.json): Node.js package manifest and runner scripts.

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
