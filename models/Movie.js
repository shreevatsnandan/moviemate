import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  genre: { type: [String], required: true },
  language: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  posterUrl: { type: String, required: true },
  trailerUrl: { type: String },
  rating: { type: String, enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'] },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Movie || mongoose.model('Movie', movieSchema);