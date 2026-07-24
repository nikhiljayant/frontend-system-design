const GRAPHQL_URL = 'http://localhost:4000/';

// Helper function to perform GraphQL HTTP POST requests
async function fetchGraphQL(query, variables = {}) {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

async function main() {
  try {
    // 1. Query: Fetch all users
    console.log('--- Query: Fetch all users ---');
    const getUsersQuery = `
      query GetUsers {
        users {
          id
          name
          email
        }
      }
    `;
    const usersResult = await fetchGraphQL(getUsersQuery);
    console.log(JSON.stringify(usersResult, null, 2));

    // 2. Mutation: Create a new user
    console.log('\n--- Mutation: Create user ---');
    const createUserMutation = `
      mutation CreateUser($name: String!, $email: String!) {
        createUser(name: $name, email: $email) {
          id
          name
          email
        }
      }
    `;
    const createResult = await fetchGraphQL(createUserMutation, {
      name: 'Charlie',
      email: 'charlie@example.com',
    });
    console.log(JSON.stringify(createResult, null, 2));

    // 3. Query: Fetch single user by ID
    console.log('\n--- Query: Fetch user by ID ---');
    const getUserQuery = `
      query GetUser($id: ID!) {
        user(id: $id) {
          id
          name
          email
        }
      }
    `;
    const singleUserResult = await fetchGraphQL(getUserQuery, { id: '3' });
    console.log(JSON.stringify(singleUserResult, null, 2));
  } catch (error) {
    console.error('Error executing GraphQL operations:', error.message);
  }
}

main();
