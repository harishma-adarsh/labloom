const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createBooking);

router.route('/my')
    .get(protect, getMyBookings);

router.route('/:id')
    .put(protect, updateBookingStatus);

module.exports = router;
