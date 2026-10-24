const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const auth = require('../middleware/auth');

router.get('/', activityController.getAllActivities);
router.get('/:id', activityController.getActivityById);
router.post('/', auth, activityController.createActivity);
router.put('/:id', auth, activityController.updateActivity);
router.delete('/:id', auth, activityController.deleteActivity);

module.exports = router;
