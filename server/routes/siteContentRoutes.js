const express = require('express');
const router = express.Router();
const store = require('../utils/dataStore');

router.get('/', (req, res) => {
  try {
    const content = store.getAllContent();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving site content', error: err.message });
  }
});

router.put('/', (req, res) => {
  try {
    const updated = store.setFullContent(req.body);
    res.json({ success: true, content: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error saving site content', error: err.message });
  }
});

module.exports = router;
