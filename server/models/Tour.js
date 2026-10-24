const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  images: [{
    type: String
  }],
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
  duration: {
    days: Number,
    nights: Number
  },
  category: {
    type: String
  },
  included: [{
    name: String,
    icon: String
  }],
  highlights: [{
    type: String
  }],
  activities: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 4.0
  },
  seeMoreCount: {
    type: Number,
    default: 0
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

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
