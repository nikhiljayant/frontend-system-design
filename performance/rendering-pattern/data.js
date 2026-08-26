// Shared Data Source (Mock Database)
// Used by CSR (via API endpoint), SSR (server-side fetch), and SSG (build time generation)

const getProducts = () => [
  { id: 1, name: 'Laptop', price: '$999' },
  { id: 2, name: 'Smartphone', price: '$699' },
  { id: 3, name: 'Headphones', price: '$199' }
];

module.exports = { getProducts };
