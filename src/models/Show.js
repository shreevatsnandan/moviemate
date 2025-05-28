import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  hall: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: [[mongoose.Schema.Types.Mixed]], required: true },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Show || mongoose.model('Show', showSchema);