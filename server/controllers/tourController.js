const Tour = require('../models/Tour');

exports.getAllTours = async (req, res) => {
  try {
    const { category, isPublic } = req.query;
    const query = {};
    if (category) query.category = category;
    if (isPublic === 'true') query.isActive = true;

    const tours = await Tour.find(query).sort({ createdAt: -1 });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(400).json({ message: 'Error creating tour', error: error.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (error) {
    res.status(400).json({ message: 'Error updating tour', error: error.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
   const tour = await Tour.findByIdAndDelete(req.params.id);
    console.log(req.params.id)
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json({ message: 'Tour deleted (soft)', tour });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
