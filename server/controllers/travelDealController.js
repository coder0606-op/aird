const TravelDeal = require('../models/TravelDeal');

// Get all travel deals (optionally filter by active status)
exports.getDeals = async (req, res) => {
  try {
    const query = req.query.all ? {} : { active: true };
    const deals = await TravelDeal.find(query).sort({ order: 1, createdAt: -1 });
    res.json(deals);
  } catch (error) {
    console.error('Error fetching travel deals:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single deal by ID
exports.getDealById = async (req, res) => {
  try {
    const deal = await TravelDeal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.json(deal);
  } catch (error) {
    console.error('Error fetching deal:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Create a new travel deal
exports.createDeal = async (req, res) => {
  try {
    const newDeal = new TravelDeal(req.body);
    const savedDeal = await newDeal.save();
    res.status(201).json(savedDeal);
  } catch (error) {
    console.error('Error creating travel deal:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing travel deal
exports.updateDeal = async (req, res) => {
  try {
    const updatedDeal = await TravelDeal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedDeal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    
    res.json(updatedDeal);
  } catch (error) {
    console.error('Error updating travel deal:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a travel deal
exports.deleteDeal = async (req, res) => {
  try {
    const deletedDeal = await TravelDeal.findByIdAndDelete(req.params.id);
    if (!deletedDeal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.json({ message: 'Deal deleted successfully' });
  } catch (error) {
    console.error('Error deleting travel deal:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
