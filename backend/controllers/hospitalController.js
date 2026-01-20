const Hospital = require('../models/Hospital');
const Report = require('../models/Report');
const Booking = require('../models/Booking');

// @desc    Get all hospitals
// @route   GET /api/hospitals
exports.getHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find({ isApproved: true });
        res.json(hospitals);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Share report with hospital (Candidate for DFD 2.0 Patient Module)
// @route   PUT /api/reports/:id/share
exports.shareReport = async (req, res) => {
    try {
        const { hospitalId } = req.body;
        const report = await Report.findById(req.params.id);

        if (!report) return res.status(404).json({ message: 'Report not found' });
        if (report.patientId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to share this report' });
        }

        // Add to sharedWith if not already shared
        const isAlreadyShared = report.sharedWith.some(share => share.hospitalId.toString() === hospitalId);
        if (!isAlreadyShared) {
            report.sharedWith.push({ hospitalId });
            await report.save();
        }

        res.json({ message: 'Report shared successfully', report });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get reports shared with hospital (DFD 2.0 Hospital Module)
// @route   GET /api/hospitals/shared-reports
exports.getSharedReports = async (req, res) => {
    try {
        const hospital = await Hospital.findOne({ userId: req.user._id });
        if (!hospital) return res.status(404).json({ message: 'Hospital profile not found' });

        const reports = await Report.find({ 'sharedWith.hospitalId': hospital._id })
            .populate('patientId', 'name age gender bloodGroup');
        res.json(reports);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
