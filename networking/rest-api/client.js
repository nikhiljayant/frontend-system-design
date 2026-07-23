const BASE_URL = 'http://localhost:3000/api/items';

async function main() {
  try {
    // 1. GET all items
    console.log('--- GET /api/items ---');
    let res = await fetch(BASE_URL);
    let data = await res.json();
    console.log('All Items:', data);

    // 2. POST create new item
    console.log('\n--- POST /api/items ---');
    res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Item Three' }),
    });
    data = await res.json();
    console.log('Created Item:', data);

    // 3. GET single item
    console.log('\n--- GET /api/items/3 ---');
    res = await fetch(`${BASE_URL}/3`);
    data = await res.json();
    console.log('Fetched Item #3:', data);

    // 4. DELETE item
    console.log('\n--- DELETE /api/items/3 ---');
    res = await fetch(`${BASE_URL}/3`, { method: 'DELETE' });
    data = await res.json();
    console.log('Deleted Item:', data);
  } catch (error) {
    console.error('Request failed:', error.message);
  }
}

main();
