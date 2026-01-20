const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'lab_admin', 'hospital_admin', 'admin'],
        default: 'patient'
    },
    isApproved: { type: Boolean, default: false }, // For doctor/lab/hospital accounts
    profilePictureURL: { type: String },
    age: { type: Number },
    gender: { type: String },
    bloodGroup: { type: String },
    fcmToken: { type: String }, // For push notifications
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
