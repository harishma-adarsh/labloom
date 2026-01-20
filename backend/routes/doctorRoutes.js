const express = require('express');
const router = express.Router();
const { getDoctors, getDoctorById, updateDoctorProfile } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.post('/profile', protect, updateDoctorProfile);

module.exports = router;
