const express = require('express');
const router = express.Router();
const { getAllPayments, updatePaymentStatus, createPayment } = require('../controllers/paymentController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, isAdmin, getAllPayments);
router.put('/:id', protect, isAdmin, updatePaymentStatus);
router.post('/', protect, createPayment);

module.exports = router;
