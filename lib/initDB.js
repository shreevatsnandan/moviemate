const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config(); // Load environment variables

async function initializeDatabase() {
  // Check if MONGODB_URI exists
  if (!process.env.MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI not found in .env file');
    process.exit(1);
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();

    // Create collections
    await db.createCollection('users');
    await db.createCollection('movies');
    await db.createCollection('theaters');
    await db.createCollection('halls');
    await db.createCollection('shows');
    await db.createCollection('bookings');

    // Create indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('movies').createIndex({ title: 'text' });
    await db.collection('theaters').createIndex({ 'location.coordinates': '2dsphere' });

    console.log('🎉 Database initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
  } finally {
    await client.close();
  }
}

initializeDatabase();