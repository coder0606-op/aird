const Enquiry = require('../models/Enquiry');
const store = require('../utils/dataStore');

exports.createEnquiry = async (req, res) => {
  try {
    const storedItem = store.add('enquiries', req.body);
    let savedEnquiry = storedItem;
    try {
      const newEnquiry = new Enquiry({ ...req.body, _id: storedItem._id });
      savedEnquiry = await newEnquiry.save();
    } catch (dbErr) {
      console.warn('[Enquiry DB save fallback]', dbErr.message);
    }
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry: savedEnquiry || storedItem });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting enquiry', error: error.message });
  }
};

exports.getAllEnquiries = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    let enquiries = [];
    let total = 0;
    try {
      enquiries = await Enquiry.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      total = await Enquiry.countDocuments();
    } catch (e) {
      console.warn('[Enquiry DB fallback]', e.message);
    }

    if (!enquiries || enquiries.length === 0) {
      const allStored = store.get('enquiries');
      total = allStored.length;
      enquiries = allStored.slice(skip, skip + limit);
    }

    res.json({
      enquiries,
      totalPages: Math.ceil(total / limit) || 1,
      currentPage: page,
      total
    });
  } catch (error) {
    const allStored = store.get('enquiries');
    res.json({
      enquiries: allStored,
      totalPages: 1,
      currentPage: 1,
      total: allStored.length
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const updatedStore = store.update('enquiries', req.params.id, { isRead: true });
    let enquiry = updatedStore;
    try {
      enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    } catch (e) {}
    res.json(enquiry || updatedStore);
  } catch (error) {
    const updatedStore = store.update('enquiries', req.params.id, { isRead: true });
    res.json(updatedStore);
  }
};

exports.deleteEnquiry = async (req, res) => {
  try {
    store.delete('enquiries', req.params.id);
    try {
      await Enquiry.findByIdAndDelete(req.params.id);
    } catch (e) {}
    res.json({ message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
