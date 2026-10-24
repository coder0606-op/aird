const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  destination: {
    type: String
  },
  serviceRequired: {
    type: String
  },
  message: {
    type: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);
module.exports = Enquiry;
