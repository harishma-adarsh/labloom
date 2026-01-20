const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab' },
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' }, // For linked/referred bookings
    testId: { type: String }, // If it's a lab booking
    type: { type: String, enum: ['doctor', 'lab'], required: true },
    appointmentDateTime: { type: Date, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    reasonForVisit: { type: String },
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    amount: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
