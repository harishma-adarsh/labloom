const Consultation = require('../models/Consultation');
const Booking = require('../models/Booking');

// @desc    Create or update consultation record
// @route   POST /api/consultations
exports.saveConsultation = async (req, res) => {
    try {
        const { bookingId, diagnosis, prescription, notes, followUpDate } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        const consultation = await Consultation.findOneAndUpdate(
            { bookingId },
            {
                bookingId,
                doctorId: booking.doctorId,
                patientId: booking.patientId,
                diagnosis,
                prescription,
                notes,
                followUpDate
            },
            { new: true, upsert: true }
        );

        // Automatically mark booking as completed if consultation is saved
        booking.status = 'completed';
        await booking.save();

        res.json(consultation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get consultation record for a booking
// @route   GET /api/consultations/:bookingId
exports.getConsultationByBooking = async (req, res) => {
    try {
        const consultation = await Consultation.findOne({ bookingId: req.params.bookingId });
        if (!consultation) return res.status(404).json({ message: 'No consultation record found' });
        res.json(consultation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
