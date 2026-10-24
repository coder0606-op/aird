const express = require('express');
const router = express.Router();
const visaController = require('../controllers/visaController');
const auth = require('../middleware/auth');

router.get('/', visaController.getAllVisas);
router.get('/:id', visaController.getVisaById);
router.post('/', auth, visaController.createVisa);
router.put('/:id', auth, visaController.updateVisa);
router.delete('/:id', auth, visaController.deleteVisa);

module.exports = router;
