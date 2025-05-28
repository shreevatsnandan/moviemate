import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  seats: [{
    seatId: { type: String, required: true },
    row: { type: Number, required: true },
    col: { type: Number, required: true },
    type: { type: String, enum: ['standard', 'premium'], default: 'standard' }
  }],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'confirmed' 
  },
  paymentMethod: { 
    type: String, 
    enum: ['credit_card', 'debit_card', 'netbanking', 'upi', 'wallet'],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);