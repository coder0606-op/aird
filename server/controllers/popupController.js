const Popup = require('../models/Popup');

// Get all popups
exports.getAllPopups = async (req, res) => {
  try {
    const { isActive } = req.query;
    const query = {};
    if (isActive === 'true') query.isActive = true;

    const popups = await Popup.find(query).sort({ order: 1, createdAt: -1 });
    res.json(popups);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new popup
exports.createPopup = async (req, res) => {
  try {
    const newPopup = new Popup(req.body);
    const savedPopup = await newPopup.save();
    res.status(201).json(savedPopup);
  } catch (error) {
    res.status(400).json({ message: 'Error creating popup', error: error.message });
  }
};

// Update a popup
exports.updatePopup = async (req, res) => {
  try {
    const popup = await Popup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!popup) return res.status(404).json({ message: 'Popup not found' });
    res.json(popup);
  } catch (error) {
    res.status(400).json({ message: 'Error updating popup', error: error.message });
  }
};

// Delete a popup
exports.deletePopup = async (req, res) => {
  try {
    const popup = await Popup.findByIdAndDelete(req.params.id);
    if (!popup) return res.status(404).json({ message: 'Popup not found' });
    res.json({ message: 'Popup deleted', popup });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
