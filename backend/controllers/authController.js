const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Request OTP (Placeholder for actual SMS service)
// @route   POST /api/auth/request-otp
exports.requestOtp = async (req, res) => {
    const { mobileNumber } = req.body;
    if (!mobileNumber) return res.status(400).json({ message: 'Mobile number is required' });

    // Logic to send OTP would go here
    res.json({ message: 'OTP sent to ' + mobileNumber, otp: '1234' }); // Demo OTP (4 digits for mobile)
};

// @desc    Verify OTP & Login/Register
// @route   POST /api/auth/verify-otp
exports.verifyOtp = async (req, res) => {
    const { mobileNumber, otp, name, role } = req.body;

    if (otp !== '1234') return res.status(400).json({ message: 'Invalid OTP' });

    let user = await User.findOne({ mobileNumber });

    if (!user) {
        if (!name) return res.status(400).json({ message: 'Name is required for registration' });
        user = await User.create({
            name,
            mobileNumber,
            email: `${mobileNumber}@laablume.com`, // Temporary email
            role: role || 'patient'
        });
    }

    res.json({
        _id: user._id,
        name: user.name,
        mobileNumber: user.mobileNumber,
        role: user.role,
        token: generateToken(user._id)
    });
};
