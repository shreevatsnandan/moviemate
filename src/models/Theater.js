import mongoose from 'mongoose';

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String }
  },
  halls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hall' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Theater || mongoose.model('Theater', theaterSchema);