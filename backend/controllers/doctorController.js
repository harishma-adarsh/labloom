const Doctor = require('../models/Doctor');

// @desc    Get all doctors
// @route   GET /api/doctors
exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.json(doctors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (doctor) res.json(doctor);
        else res.status(404).json({ message: 'Doctor not found' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Create/Update doctor profile
// @route   POST /api/doctors/profile
exports.updateDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findOneAndUpdate(
            { userId: req.user._id },
            { ...req.body, userId: req.user._id },
            { new: true, upsert: true }
        );
        res.json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
