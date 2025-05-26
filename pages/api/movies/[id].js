import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db("movie_booking");

  if (req.method === 'GET') {
    try {
      const movie = await db.collection("movies")
        .findOne({ _id: new ObjectId(id) });
      res.status(200).json(movie);
    } catch (e) {
      res.status(404).json({ error: "Movie not found" });
    }
  }

  else if (req.method === 'PUT') {
    try {
      const updatedMovie = {
        ...req.body,
        updatedAt: new Date()
      };
      
      await db.collection("movies").updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedMovie }
      );
      res.status(200).json(updatedMovie);
    } catch (e) {
      res.status(500).json({ error: "Failed to update movie" });
    }
  }

  else if (req.method === 'DELETE') {
    try {
      await db.collection("movies").deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "Movie deleted" });
    } catch (e) {
      res.status(500).json({ error: "Failed to delete movie" });
    }
  }

  else {
    res.status(405).json({ error: "Method not allowed" });
  }
}