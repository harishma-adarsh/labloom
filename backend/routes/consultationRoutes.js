const express = require('express');
const router = express.Router();
const { saveConsultation, getConsultationByBooking } = require('../controllers/consultationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, saveConsultation);
router.get('/:bookingId', protect, getConsultationByBooking);

module.exports = router;
