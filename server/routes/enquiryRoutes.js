const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const auth = require('../middleware/auth');

router.post('/', enquiryController.createEnquiry); // Public route
router.get('/', auth, enquiryController.getAllEnquiries);
router.put('/:id/read', auth, enquiryController.markAsRead);
router.delete('/:id', auth, enquiryController.deleteEnquiry);

module.exports = router;
