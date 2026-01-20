const Review = require('../models/Review');
const Booking = require('../models/Booking');

// @desc    Submit a review for a doctor or lab
// @route   POST /api/reviews
exports.submitReview = async (req, res) => {
    const { targetId, targetType, rating, comment, bookingId } = req.body;

    try {
        const review = await Review.create({
            patientId: req.user._id,
            targetId,
            targetType,
            rating,
            comment
        });

        // Optionally mark the booking as "reviewed" if you want to track it
        await Booking.findByIdAndUpdate(bookingId, { isReviewed: true });

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get reviews for a doctor or lab
// @route   GET /api/reviews/:targetId
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ targetId: req.params.targetId })
            .populate('patientId', 'name');
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
