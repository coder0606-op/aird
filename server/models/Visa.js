const mongoose = require('mongoose');

const visaSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  flagImage: {
    type: String
  },
  type: {
    type: String,
    enum: ['Tourist', 'Business', 'Transit']
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number
  },
  currency: {
    type: String,
    default: 'INR'
  },
  processingTime: {
    type: String
  },
  isFastTrack: {
    type: Boolean,
    default: true
  },
  badgeText: {
    type: String,
    default: 'FAST TRACK'
  },
  getOnDate: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Visa = mongoose.model('Visa', visaSchema);
module.exports = Visa;
