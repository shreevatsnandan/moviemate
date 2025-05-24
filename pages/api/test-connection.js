import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db() 
    
    await db.command({ ping: 1 })
    
    res.status(200).json({ 
      message: "We're connected to MongoDB!",
      database: db.databaseName 
    })
  } catch (e) {
    res.status(500).json({ 
      message: "Oh no! Something went wrong",
      error: e.message 
    })
  }
}