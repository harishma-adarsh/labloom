const Lab = require('../models/Lab');

// @desc    Get all labs
// @route   GET /api/labs
exports.getLabs = async (req, res) => {
    try {
        const labs = await Lab.find({});
        res.json(labs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get lab tests
// @route   GET /api/labs/:id/tests
exports.getLabTests = async (req, res) => {
    try {
        const lab = await Lab.findById(req.params.id);
        if (lab) res.json(lab.tests);
        else res.status(404).json({ message: 'Lab not found' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Add new test to lab
// @route   POST /api/labs/tests
exports.addTest = async (req, res) => {
    try {
        const lab = await Lab.findOne({ userId: req.user._id });
        if (lab) {
            lab.tests.push(req.body);
            await lab.save();
            res.status(201).json(lab);
        } else {
            res.status(404).json({ message: 'Lab profile not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update lab availability
// @route   PUT /api/labs/availability
exports.updateAvailability = async (req, res) => {
    try {
        const lab = await Lab.findOneAndUpdate(
            { userId: req.user._id },
            { availability: req.body.availability },
            { new: true }
        );
        if (!lab) return res.status(404).json({ message: 'Lab not found' });
        res.json(lab);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
