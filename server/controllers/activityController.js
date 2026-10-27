const Activity = require('../models/Activity');
const store = require('../utils/dataStore');

exports.getAllActivities = async (req, res) => {
  try {
    const { category, isPublic } = req.query;
    const query = {};
    if (category) query.category = category;
    if (isPublic === 'true') query.isActive = true;

    let activities = [];
    try {
      activities = await Activity.find(query).sort({ createdAt: -1 });
    } catch (e) {
      console.warn('[Activity DB fallback]', e.message);
    }

    if (!activities || activities.length === 0) {
      activities = store.get('activities');
    }
    res.json(activities);
  } catch (error) {
    res.json(store.get('activities') || []);
  }
};

exports.getActivityById = async (req, res) => {
  try {
    let activity = null;
    try {
      activity = await Activity.findById(req.params.id);
    } catch (e) {}

    if (!activity) {
      activity = store.getById('activities', req.params.id);
    }

    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    const act = store.getById('activities', req.params.id);
    if (act) return res.json(act);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createActivity = async (req, res) => {
  try {
    const storedItem = store.add('activities', req.body);
    let savedActivity = storedItem;
    try {
      const newActivity = new Activity({ ...req.body, _id: storedItem._id });
      savedActivity = await newActivity.save();
    } catch (dbErr) {
      console.warn('[Activity DB save fallback]', dbErr.message);
    }
    res.status(201).json(savedActivity || storedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating activity', error: error.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const updatedStore = store.update('activities', req.params.id, req.body);
    let activity = updatedStore;
    try {
      activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    } catch (dbErr) {
      console.warn('[Activity DB update fallback]', dbErr.message);
    }
    res.json(activity || updatedStore);
  } catch (error) {
    const updatedStore = store.update('activities', req.params.id, req.body);
    res.json(updatedStore);
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    store.delete('activities', req.params.id);
    try {
      await Activity.findByIdAndDelete(req.params.id);
    } catch (e) {}
    res.json({ message: 'Activity deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
