const { MongoClient } = require('mongodb');
require('dotenv').config();

async function checkCollections() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();
    
    // List all collections
    const collections = await db.listCollections().toArray();
    
    console.log('📂 Collections in database:');
    collections.forEach(col => {
      console.log(`- ${col.name}`);
    });
    
    // Check specific collection exists
    const requiredCollections = ['users', 'movies', 'theaters', 'halls', 'shows', 'bookings'];
    const existingCollections = collections.map(c => c.name);
    
    console.log('\n🔍 Missing collections:');
    requiredCollections.forEach(col => {
      if (!existingCollections.includes(col)) {
        console.log(`❌ ${col}`);
      } else {
        console.log(`✅ ${col}`);
      }
    });
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

checkCollections();