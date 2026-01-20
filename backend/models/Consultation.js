const mongoose = require('mongoose');

const consultationSchema = mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    diagnosis: { type: String },
    prescription: [{
        medicine: String,
        dosage: String,
        frequency: String,
        duration: String
    }],
    notes: { type: String },
    followUpDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Consultation', consultationSchema);
