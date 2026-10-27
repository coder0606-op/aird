const TravelDeal = require('../models/TravelDeal');
const store = require('../utils/dataStore');

// Get all travel deals
exports.getDeals = async (req, res) => {
  try {
    const query = req.query.all ? {} : { active: true };
    let deals = [];
    try {
      deals = await TravelDeal.find(query).sort({ order: 1, createdAt: -1 });
    } catch (e) {
      console.warn('[TravelDeal DB fallback]', e.message);
    }

    if (!deals || deals.length === 0) {
      deals = store.get('travelDeals');
    }
    res.json(deals);
  } catch (error) {
    res.json(store.get('travelDeals') || []);
  }
};

// Get single deal by ID
exports.getDealById = async (req, res) => {
  try {
    let deal = null;
    try {
      deal = await TravelDeal.findById(req.params.id);
    } catch (e) {}

    if (!deal) {
      deal = store.getById('travelDeals', req.params.id);
    }

    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.json(deal);
  } catch (error) {
    const deal = store.getById('travelDeals', req.params.id);
    if (deal) return res.json(deal);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new travel deal
exports.createDeal = async (req, res) => {
  try {
    const storedItem = store.add('travelDeals', req.body);
    let savedDeal = storedItem;
    try {
      const newDeal = new TravelDeal({ ...req.body, _id: storedItem._id });
      savedDeal = await newDeal.save();
    } catch (dbErr) {
      console.warn('[TravelDeal DB save fallback]', dbErr.message);
    }
    res.status(201).json(savedDeal || storedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update an existing travel deal
exports.updateDeal = async (req, res) => {
  try {
    const updatedStore = store.update('travelDeals', req.params.id, req.body);
    let updatedDeal = updatedStore;
    try {
      updatedDeal = await TravelDeal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
    } catch (dbErr) {
      console.warn('[TravelDeal DB update fallback]', dbErr.message);
    }
    res.json(updatedDeal || updatedStore);
  } catch (error) {
    const updatedStore = store.update('travelDeals', req.params.id, req.body);
    res.json(updatedStore);
  }
};

// Delete a travel deal
exports.deleteDeal = async (req, res) => {
  try {
    store.delete('travelDeals', req.params.id);
    try {
      await TravelDeal.findByIdAndDelete(req.params.id);
    } catch (e) {}
    res.json({ message: 'Deal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
