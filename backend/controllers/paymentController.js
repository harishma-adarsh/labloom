const Payment = require('../models/Payment');

// @desc    Get all payments (for Admin)
// @route   GET /api/payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('patientId', 'name mobileNumber')
            .populate('bookingId');
        res.json(payments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update payment status
// @route   PUT /api/payments/:id
exports.updatePaymentStatus = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Create a payment record (usually called after gateway success)
// @route   POST /api/payments
exports.createPayment = async (req, res) => {
    const { bookingId, amount, transactionId, paymentMethod } = req.body;
    try {
        const payment = await Payment.create({
            bookingId,
            patientId: req.user._id,
            amount,
            transactionId,
            status: 'completed',
            paymentMethod
        });
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
