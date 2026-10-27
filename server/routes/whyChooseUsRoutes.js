const express = require('express');
const router = express.Router();
const store = require('../utils/dataStore');

// GET all cards
router.get('/', (req, res) => {
  try {
    const list = store.get('whyChooseUs');
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving feature cards', error: err.message });
  }
});

// POST new card
router.post('/', (req, res) => {
  try {
    const item = store.add('whyChooseUs', req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Error creating feature card', error: err.message });
  }
});

// PUT update card
router.put('/:id', (req, res) => {
  try {
    const item = store.update('whyChooseUs', req.params.id, req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: 'Error updating feature card', error: err.message });
  }
});

// DELETE card
router.delete('/:id', (req, res) => {
  try {
    store.delete('whyChooseUs', req.params.id);
    res.json({ message: 'Feature card deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting feature card', error: err.message });
  }
});

module.exports = router;
