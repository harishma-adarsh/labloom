const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Lab = require('../models/Lab');
const Hospital = require('../models/Hospital');
const Booking = require('../models/Booking');

// @desc    Approve a provider (Doctor, Lab, or Hospital)
// @route   PUT /api/admin/approve/:type/:id
exports.approveProvider = async (req, res) => {
    try {
        const { type, id } = req.params;
        let model;

        if (type === 'doctor') model = Doctor;
        else if (type === 'lab') model = Lab;
        else if (type === 'hospital') model = Hospital;
        else return res.status(400).json({ message: 'Invalid provider type' });

        const provider = await model.findByIdAndUpdate(id, { isApproved: true }, { new: true });
        if (!provider) return res.status(404).json({ message: 'Provider not found' });

        res.json({ message: `${type} approved successfully`, provider });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get dashboard analytics (DFD 7.0 Admin Module)
// @route   GET /api/admin/analytics
exports.getAnalytics = async (req, res) => {
    try {
        const stats = {
            patients: await User.countDocuments({ role: 'patient' }),
            doctors: await Doctor.countDocuments({}),
            labs: await Lab.countDocuments({}),
            hospitals: await Hospital.countDocuments({}),
            totalBookings: await Booking.countDocuments({}),
            completedBookings: await Booking.countDocuments({ status: 'completed' }),
        };
        res.json(stats);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get pending registrations (DFD 3.0 Admin Module)
// @route   GET /api/admin/pending
exports.getPendingRegistrations = async (req, res) => {
    try {
        const pending = {
            doctors: await Doctor.find({ isApproved: false }),
            labs: await Lab.find({ isApproved: false }),
            hospitals: await Hospital.find({ isApproved: false }),
        };
        res.json(pending);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
