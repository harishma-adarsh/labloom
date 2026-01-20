const express = require('express');
const router = express.Router();
const { approveProvider, getAnalytics, getPendingRegistrations } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/analytics', protect, isAdmin, getAnalytics);
router.get('/pending', protect, isAdmin, getPendingRegistrations);
router.put('/approve/:type/:id', protect, isAdmin, approveProvider);

module.exports = router;
