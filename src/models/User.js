import { Verified } from 'lucide-react';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    required: true,
    enum: ['customer', 'theater_owner', 'admin'],
    default: 'customer'
  },
  name: { type: String, required: true },
  phone: { type: String },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  theaters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Theater' }],
  createdAt: { type: Date, default: Date.now },
  verified: {type: Boolean, default: false},
  verifiedCode: { type:String},
  verifiedCodeExp: {type: Date},
  forgotPass: {type: Boolean, default: false},
  forgotPassCode: { type:String},
  forgotPassCodeExp: {type: Date}
});

export default mongoose.models.User || mongoose.model('User', userSchema);