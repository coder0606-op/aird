const Testimonial = require('../models/Testimonial');
const store = require('../utils/dataStore');

exports.getAllTestimonials = async (req, res) => {
  try {
    const { isPublic } = req.query;
    const query = {};
    if (isPublic === 'true') query.isActive = true;

    let testimonials = [];
    try {
      testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    } catch (e) {
      console.warn('[Testimonial DB fallback]', e.message);
    }

    if (!testimonials || testimonials.length === 0) {
      testimonials = store.get('testimonials');
    }
    res.json(testimonials);
  } catch (error) {
    res.json(store.get('testimonials') || []);
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const storedItem = store.add('testimonials', req.body);
    let savedTestimonial = storedItem;
    try {
      const newTestimonial = new Testimonial({ ...req.body, _id: storedItem._id });
      savedTestimonial = await newTestimonial.save();
    } catch (dbErr) {
      console.warn('[Testimonial DB save fallback]', dbErr.message);
    }
    res.status(201).json(savedTestimonial || storedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating testimonial', error: error.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const updatedStore = store.update('testimonials', req.params.id, req.body);
    let testimonial = updatedStore;
    try {
      testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    } catch (dbErr) {
      console.warn('[Testimonial DB update fallback]', dbErr.message);
    }
    res.json(testimonial || updatedStore);
  } catch (error) {
    const updatedStore = store.update('testimonials', req.params.id, req.body);
    res.json(updatedStore);
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    store.delete('testimonials', req.params.id);
    try {
      await Testimonial.findByIdAndDelete(req.params.id);
    } catch (e) {}
    res.json({ message: 'Testimonial deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
