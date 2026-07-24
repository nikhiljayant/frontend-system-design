const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

// Read GraphQL SDL schema file
const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

// In-memory data store
const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];

// Resolvers map GraphQL fields to execution logic
const resolvers = {
  Query: {
    // Resolver for 'users' query
    users: () => users,
    // Resolver for 'user' query with arguments
    user: (_, { id }) => users.find((u) => u.id === id),
  },
  Mutation: {
    // Resolver for 'createUser' mutation
    createUser: (_, { name, email }) => {
      const newUser = { id: String(users.length + 1), name, email };
      users.push(newUser);
      return newUser;
    },
  },
};

// Initialize and launch standalone Apollo Server
async function main() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
  console.log(`GraphQL Server running at ${url}`);
}

main();
