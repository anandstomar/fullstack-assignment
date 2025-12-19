import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  city: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Contact', contactSchema); 