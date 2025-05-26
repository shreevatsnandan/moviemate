import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("movie_booking");

  if (req.method === 'GET') {
    try {
      const movies = await db.collection("movies")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      res.status(200).json(movies);
    } catch (e) {
      res.status(500).json({ error: "Failed to load movies" });
    }
  }

  else if (req.method === 'POST') {
    try {
      const movie = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await db.collection("movies").insertOne(movie);
      res.status(201).json({ _id: result.insertedId, ...movie });
    } catch (e) {
      res.status(500).json({ error: "Failed to add movie" });
    }
  }

  else {
    res.status(405).json({ error: "Method not allowed" });
  }
}