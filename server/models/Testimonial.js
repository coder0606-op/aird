const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  title: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  avatarColor: {
    type: String,
    default: '#00bcd4'
  },
  initial: {
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

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
module.exports = Testimonial;
