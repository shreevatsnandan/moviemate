import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collections = await db.listCollections().toArray();
    
    res.status(200).json({
      database: db.databaseName,
      collections: collections.map(c => c.name)
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}