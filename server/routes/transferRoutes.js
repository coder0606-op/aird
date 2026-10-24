const express = require('express');
const router = express.Router();
const store = require('../utils/dataStore');

router.get('/', (req, res) => res.json(store.get('transfers')));
router.post('/', (req, res) => res.status(201).json(store.add('transfers', req.body)));
router.put('/:id', (req, res) => res.json(store.update('transfers', req.params.id, req.body)));
router.delete('/:id', (req, res) => {
  store.delete('transfers', req.params.id);
  res.json({ message: 'Transfer deleted' });
});

module.exports = router;
