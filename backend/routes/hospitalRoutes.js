const express = require('express');
const router = express.Router();
const { getHospitals, shareReport, getSharedReports } = require('../controllers/hospitalController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getHospitals);
router.get('/shared-reports', protect, getSharedReports);
router.put('/reports/:id/share', protect, shareReport);

module.exports = router;
