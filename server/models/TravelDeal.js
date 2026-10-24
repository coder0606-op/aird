const mongoose = require('mongoose');

const travelDealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  badge: { type: String },
  badgeColor: { type: String, default: 'bg-red-500' },
  image: { type: String, required: true },
  description: { type: String },
  activities: [{ type: String }],
  duration: {
    days: { type: Number, default: 1 },
    nights: { type: Number, default: 0 }
  },
  included: [{ type: String }],
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('TravelDeal', travelDealSchema);
