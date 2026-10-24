const Visa = require('../models/Visa');

exports.getAllVisas = async (req, res) => {
  try {
    const { isPublic } = req.query;
    const query = {};
    if (isPublic === 'true') query.isActive = true;
    
    const visas = await Visa.find(query).sort({ createdAt: -1 });
    res.json(visas);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getVisaById = async (req, res) => {
  try {
    const visa = await Visa.findById(req.params.id);
    if (!visa) return res.status(404).json({ message: 'Visa not found' });
    res.json(visa);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createVisa = async (req, res) => {
  try {
    const newVisa = new Visa(req.body);
    const savedVisa = await newVisa.save();
    res.status(201).json(savedVisa);
  } catch (error) {
    res.status(400).json({ message: 'Error creating visa', error: error.message });
  }
};

exports.updateVisa = async (req, res) => {
  try {
    const visa = await Visa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!visa) return res.status(404).json({ message: 'Visa not found' });
    res.json(visa);
  } catch (error) {
    res.status(400).json({ message: 'Error updating visa', error: error.message });
  }
};

exports.deleteVisa = async (req, res) => {
  try {
    const visa = await Visa.findByIdAndDelete(req.params.id);
    if (!visa) return res.status(404).json({ message: 'Visa not found' });
    res.json({ message: 'Visa deleted (soft)', visa });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
