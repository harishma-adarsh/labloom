const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorName: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    consultationFee: { type: Number, required: true },
    isApproved: { type: Boolean, default: false },
    education: { type: String },
    hospital: { type: String },
    languages: [{ type: String }],
    isOnline: { type: Boolean, default: false },
    availability: [{
        day: String,
        slots: [String]
    }],
    profilePictureURL: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
