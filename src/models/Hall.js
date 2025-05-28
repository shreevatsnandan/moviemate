import mongoose from 'mongoose';

const hallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  theater: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
  capacity: { type: Number, required: true },
  seatLayout: { type: [[mongoose.Schema.Types.Mixed]], required: true },
  screenType: { type: String, enum: ['standard', 'imax', 'dolby'], default: 'standard' },
  shows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Hall || mongoose.model('Hall', hallSchema);