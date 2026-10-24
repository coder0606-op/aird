const express = require('express');
const router = express.Router();
const store = require('../utils/dataStore');

router.get('/', (req, res) => res.json(store.getSettings()));
router.put('/', (req, res) => res.json({ success: true, settings: store.updateSettings(req.body) }));

module.exports = router;
