const Tour = require('../models/Tour');
const store = require('../utils/dataStore');

exports.getAllTours = async (req, res) => {
  try {
    const { category, isPublic } = req.query;
    const query = {};
    if (category) query.category = category;
    if (isPublic === 'true') query.isActive = true;

    let tours = [];
    try {
      tours = await Tour.find(query).sort({ createdAt: -1 });
    } catch (e) {
      console.warn('[Tour DB fallback]', e.message);
    }

    if (!tours || tours.length === 0) {
      tours = store.get('tours');
    }
    res.json(tours);
  } catch (error) {
    res.json(store.get('tours') || []);
  }
};

exports.getTourById = async (req, res) => {
  try {
    let tour = null;
    try {
      tour = await Tour.findById(req.params.id);
    } catch (e) {}

    if (!tour) {
      tour = store.getById('tours', req.params.id);
    }

    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (error) {
    const tour = store.getById('tours', req.params.id);
    if (tour) return res.json(tour);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createTour = async (req, res) => {
  try {
    const storedItem = store.add('tours', req.body);
    let savedTour = storedItem;
    try {
      const newTour = new Tour({ ...req.body, _id: storedItem._id });
      savedTour = await newTour.save();
    } catch (dbErr) {
      console.warn('[Tour DB save fallback]', dbErr.message);
    }
    res.status(201).json(savedTour || storedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating tour', error: error.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedStore = store.update('tours', req.params.id, req.body);
    let tour = updatedStore;
    try {
      tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    } catch (dbErr) {
      console.warn('[Tour DB update fallback]', dbErr.message);
    }
    res.json(tour || updatedStore);
  } catch (error) {
    const updatedStore = store.update('tours', req.params.id, req.body);
    res.json(updatedStore);
  }
};

exports.deleteTour = async (req, res) => {
  try {
    store.delete('tours', req.params.id);
    try {
      await Tour.findByIdAndDelete(req.params.id);
    } catch (e) {}
    res.json({ message: 'Tour deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
