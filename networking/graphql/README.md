# Simple GraphQL Example (Node.js & Apollo Server)

A minimal GraphQL example demonstrating GraphQL SDL schemas, Queries, Mutations, Resolvers, and client-side HTTP execution.

## Files Overview
- [schema.graphql](file:///home/inxee-frontend/nikhil/frontend-system-design/networking/graphql/schema.graphql): Schema definition for types, queries, and mutations.
- [server.js](file:///home/inxee-frontend/nikhil/frontend-system-design/networking/graphql/server.js): Standalone Apollo GraphQL server implementing query and mutation resolvers.
- [client.js](file:///home/inxee-frontend/nikhil/frontend-system-design/networking/graphql/client.js): Client script executing GraphQL queries via native `fetch`.
- [package.json](file:///home/inxee-frontend/nikhil/frontend-system-design/networking/graphql/package.json): Package manifest and runner scripts.

## GraphQL Concepts Demonstrated
- **Schema & Types**: Strongly typed API contract definition using SDL (`User` type).
- **Queries & Mutations**: Fetching data and modifying state through resolvers.
- **Single Endpoint**: All operations sent via HTTP POST requests to `/`.

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
