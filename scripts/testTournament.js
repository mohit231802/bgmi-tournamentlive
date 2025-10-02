const fetch = require('node-fetch');

async function testTournament( id) {
  try {
    const response = await fetch(`http://localhost:3005/api/tournaments/${id}`);
    const data = await response.json();

    console.log('Tournament data for ID:', id);
    console.log('Mode:', data.data?.mode);
    console.log('Title:', data.data?.title);
    console.log('Status:', data.success);
    console.log('Full data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Test all three tournaments
console.log('Testing tournament APIs...\n');

testTournament('68ddfa9eb53fb10f8861bdda'); // Solo
testTournament('68ddfa9eb53fb10f8861bddb'); // Duo
testTournament('68ddfa9eb53fb10f8861bddc'); // Squad