import mongoose from 'mongoose';

const alertSubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: false
    },
    longitude: {
      type: Number,
      required: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const AlertSubscription = mongoose.model('AlertSubscription', alertSubscriptionSchema);