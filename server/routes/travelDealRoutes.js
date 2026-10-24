const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const travelDealController = require('../controllers/travelDealController');

// GET /api/travel-deals - Get all deals (public)
router.get('/', travelDealController.getDeals);

// GET /api/travel-deals/:id - Get a single deal (public)
router.get('/:id', travelDealController.getDealById);

// POST /api/travel-deals - Create a new deal (admin only)
router.post('/', auth, travelDealController.createDeal);

// PUT /api/travel-deals/:id - Update a deal (admin only)
router.put('/:id', auth, travelDealController.updateDeal);

// DELETE /api/travel-deals/:id - Delete a deal (admin only)
router.delete('/:id', auth, travelDealController.deleteDeal);

module.exports = router;
