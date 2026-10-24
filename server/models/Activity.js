const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 4.0
  },
  duration: {
    days: Number,
    nights: Number
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
    default: 'AED'
  },
  category: {
    type: String
  },
  includedServices: [{
    name: String,
    icon: String
  }],
  activities: [{
    type: String
  }],
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

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
