const express = require('express');
const router = express.Router();
const store = require('../utils/dataStore');

// GET /api/wallpapers - All hero wallpapers
router.get('/', (req, res) => {
  try {
    const list = store.get('wallpapers');
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving wallpapers', error: err.message });
  }
});

// POST /api/wallpapers - Create wallpaper
router.post('/', (req, res) => {
  try {
    const item = store.add('wallpapers', req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Error creating wallpaper', error: err.message });
  }
});

// PUT /api/wallpapers/:id - Update wallpaper
router.put('/:id', (req, res) => {
  try {
    const item = store.update('wallpapers', req.params.id, req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: 'Error updating wallpaper', error: err.message });
  }
});

// DELETE /api/wallpapers/:id - Delete wallpaper
router.delete('/:id', (req, res) => {
  try {
    store.delete('wallpapers', req.params.id);
    res.json({ message: 'Wallpaper deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting wallpaper', error: err.message });
  }
});

module.exports = router;
