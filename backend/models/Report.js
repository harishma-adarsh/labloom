const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    testName: { type: String, required: true },
    labName: { type: String },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'analyzed'], default: 'pending' },
    fileURL: { type: String },
    aiAnalysis: {
        summary: String,
        findings: [String],
        recommendations: [String],
        hasAbnormalities: { type: Boolean, default: false }
    },
    sharedWith: [{
        hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
        consentedAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
