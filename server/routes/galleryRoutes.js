const express = require('express');
const router = express.Router();
const store = require('../utils/dataStore');

router.get('/', (req, res) => res.json(store.get('gallery')));
router.post('/', (req, res) => res.status(201).json(store.add('gallery', req.body)));
router.put('/:id', (req, res) => res.json(store.update('gallery', req.params.id, req.body)));
router.delete('/:id', (req, res) => {
  store.delete('gallery', req.params.id);
  res.json({ message: 'Gallery item deleted' });
});

module.exports = router;
