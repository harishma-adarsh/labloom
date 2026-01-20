const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create({
            ...req.body,
            patientId: req.user._id // From auth middleware
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get my appointments
// @route   GET /api/bookings/my
exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ patientId: req.user._id })
            .populate('doctorId')
            .populate('labId');
        res.json(bookings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
exports.updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
