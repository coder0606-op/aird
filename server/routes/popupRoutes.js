const express = require('express');
const router = express.Router();
const popupController = require('../controllers/popupController');
const auth = require('../middleware/auth');

router.get('/', popupController.getAllPopups);
router.post('/', auth, popupController.createPopup);
router.put('/:id', auth, popupController.updatePopup);
router.delete('/:id', auth, popupController.deletePopup);

module.exports = router;
